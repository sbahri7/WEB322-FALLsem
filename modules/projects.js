const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = [];
      projectData.forEach((project) => {
        const sector = sectorData.find(
          (sector) => sector.id === project.sectorid
        );
        const projectWithSector = {
          ...project,
          sector: sector ? sector.sectorname : "Unknown",
        };
        projects.push(projectWithSector);
      });
      resolve();
    } catch (error) {
      reject("Unable to initialize projects");
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length === 0) {
      reject("No projects available");
    } else {
      resolve(projects);
    }
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      resolve(project);
    } else {
      reject("Unable to find requested project");
    }
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const filteredProjects = projects.filter((project) =>
      project.sector.toLowerCase().includes(sector.toLowerCase())
    );
    if (filteredProjects.length > 0) {
      resolve(filteredProjects);
    } else {
      reject("Unable to find requested projects");
    }
  });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector,
};
