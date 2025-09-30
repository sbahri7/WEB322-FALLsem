Add the following declaration at the top of your server.js file:
/********************************************************************************
* WEB322 – Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: _satyam bahri_____________________ Student ID: 172151227______________ Date: 09/30/2025______________
*
********************************************************************************/
const express = require("express");
const projects = require("./modules/projects");
const app = express();
const PORT = process.env.PORT || 3000;
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


projects.initialize().then(() => {
  app.get("/solutions/projects", (req, res) => {
    projects.getAllProjects()
      .then(data => res.json(data))
      .catch(err => res.status(500).send(err));
  });

  app.get("/solutions/projects/id-demo", async (req, res) => {
    try {
      const project = await projects.getProjectById(1);
      res.json(project);
    } catch (error) {
      res.status(404).send(error);
    }
  });

  app.get("/solutions/projects/sector-demo", async (req, res) => {
    try {
      const projectsBySector = await projects.getProjectsBySector("Energy");
      res.json(projectsBySector);
    } catch (error) {
      res.status(404).send(error);
    }
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error("Initialization failed", error);
});
