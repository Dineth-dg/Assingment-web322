/******************************************************************************** 
*  WEB322 – Assignment 01 
*  
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
*  
*  Name: Ileperuma Achchige Dineth Damishka Gunarathna 
*  Student ID: 130673247 
*  Date: 09/30/2025 
* 
********************************************************************************/

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const projectData = require("../Assignments/modules/projects");

app.get("/", (req, res) => {
  res.send("Assignment 1: Ileperuma Achchige Dineth Damishka Gunarathna - 130673247");
});

app.get("/solutions/projects", (req, res) => {
  projectData.initialize()
    .then(() => projectData.getAllProjects())
    .then(allProjects => res.json(allProjects))
    .catch(err => res.status(500).send("Error fetching projects: " + err.message));
});

app.get("/solutions/projects/id-demo", (req, res) => {

    let id = 9;
  projectData.initialize()
    .then(() => projectData.getProjectById(id))
    .then(project => res.json(project))
    .catch(err => {
      if (err.message.includes("Unable to find project")) {
        res.status(404).send("Project not found");
      } else {
        res.status(500).send("Error: " + err.message);
      }
    });
});

app.get("/solutions/projects/sector-demo", (req, res) => {
  projectData.initialize()
    .then(() => projectData.getProjectsBySector("agriculture"))
    .then(projects => res.json(projects))
    .catch(err => {
      if (err.message.includes("Unable to find projects")) {
        res.status(404).send("No projects found in that sector");
      } else {
        res.status(500).send("Error: " + err.message);
      }
    });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
