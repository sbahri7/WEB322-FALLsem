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
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Load data from JSON
const projectData = require(path.join(__dirname, "data", "projectdata.json"));
const sectorData = require(path.join(__dirname, "data", "sectordata.json"));

// Use EJS and set views directory (your views are in public/views)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Home page route
app.get("/", (req, res) => {
  res.render("home", { page: "/" });
});

// About page route
app.get("/about", (req, res) => {
  res.render("about", { page: "/about" });
});

// Projects list route (use all data and pass sectorData)
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;
  let projects = projectData;

  if (sector) {
    projects = projects.filter(p => p.sector && p.sector.toLowerCase() === sector.toLowerCase());
  }

  if (!projects || projects.length === 0) {
    return res.status(404).render("404", { message: `No projects found for sector: ${sector || "any"}` });
  }

  res.render("projects", { projects, sectors: sectorData, page: "/solutions/projects" });
});

// Project by ID route
app.get("/solutions/projects/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(404).render("404", { message: "Invalid project ID", page: "" });
  }
  const project = projectData.find(p => Number(p.id) === id);
  if (!project) {
    return res.status(404).render("404", { message: `No project found with id: ${id}`, page: "" });
  }
  res.render("project", { project, page: "" });
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).render("404", { message: "I'm sorry, we're unable to find what you're looking for", page: "" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
