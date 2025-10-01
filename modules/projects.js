
const projectData = require("../data/projectData"); 
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = projectData.map(proj => {
        const sectorObj = sectorData.find(sector => sector.id === proj.sector_id);
        const sectorName = sectorObj ? sectorObj.sector_name : "Unknown";
        return { ...proj, sector: sectorName };
      });
      resolve();
    } catch (error) {
      reject("Failed to initialize projects: " + error);
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    projects.length ? resolve(projects) : reject("No projects available. Did you forget to initialize?");
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const project = projects.find(p => p.id === projectId);
    project ? resolve(project) : reject(`Unable to find project with id: ${projectId}`);
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const sec = sector.toUpperCase();
    const matched = projects.filter(p => p.sector && p.sector.toUpperCase().includes(sec));
    matched.length ? resolve(matched) : reject(new Error(`Unable to find projects for sector: ${sector}`));
  });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector
};

