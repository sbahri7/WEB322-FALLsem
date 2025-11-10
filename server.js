/********************************************************************************
* WEB322 – Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: satyam bahri       Student ID: 172151227       Date: 09/30/2025
*
********************************************************************************/
const path = require("path");
const projectData = require(path.join(__dirname, "data", "projectdata.json"));
const sectorData = require(path.join(__dirname, "data", "sectordata.json"));

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'public', 'views'));


// Sample projects data
const projects = [
  { id: 1, name: "Solar Energy Project", sector: "Energy", description: "Solar power installation.", feature_img_url: "https://via.placeholder.com/600x300", intro_short: "Clean solar power initiative.", impact: "Reduces carbon emissions by 30%.", original_source_url: "https://example.com/solar" },
  { id: 2, name: "Water Conservation", sector: "Water", description: "Rainwater harvesting system.", feature_img_url: "https://via.placeholder.com/600x300", intro_short: "Captures rainwater for irrigation.", impact: "Reduces water waste by 50%.", original_source_url: "https://example.com/water" },
  { id: 3, name: "Industrial Recycling", sector: "Industry", description: "Waste recycling for factories.", feature_img_url: "https://via.placeholder.com/600x300", intro_short: "Recycling initiative for factories.", impact: "Decreases landfill waste by 40%.", original_source_url: "https://example.com/recycling" }
];

// Serve static files (css, js, images)
app.use(express.static(path.join(__dirname, "public")));

// Home page route
app.get("/", (req, res) => {
  res.render("home", { page: "/" });
});

// About page route
app.get("/about", (req, res) => {
  res.render("about", { page: "/about" });
});

// Projects list route with optional sector filter
app.get("/solutions/projects", (req, res) => {
  try {
    const sector = req.query.sector;
    if (sector) {
      const filteredProjects = projects.filter(p => p.sector.toLowerCase() === sector.toLowerCase());
      if (filteredProjects.length === 0) {
        return res.status(404).render("404", { message: `No projects found for sector: ${sector}`, page: "" });
      }
      return res.render("projects", { projects: filteredProjects, page: "/solutions/projects" });
    }
res.render("projects", { projects: yourProjectsArray, page: "/solutions/projects" });

  } catch (err) {
    res.status(500).render("404", { message: err.message, page: "" });
  }
});

// Single project by ID route
app.get("/solutions/projects", (req, res) => {
  // Optionally filter by sector from query params
  const sector = req.query.sector;
  let projects = projectData;

  if (sector) {
    projects = projects.filter(p => p.sector.toLowerCase() === sector.toLowerCase());
  }

  if (projects.length === 0) {
    return res.status(404).render("404", { message: `No projects found for sector: ${sector}`, page: "" });
  }

  res.render("projects", { projects, sectors: sectorData, page: "/solutions/projects" });
});


// Custom 404 handler
app.use((req, res) => {
  res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for", page: "" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
