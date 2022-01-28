const inquirer = require("inquirer");
// const Choices = require('inquirer/lib/objects/choices')
const fs = require("fs");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
let teamName = "";
const team = [];
const employeeCards = [];

// prompt user for manager details, call createcard function with new manager object, then prompt next
const createManager = () => {
  inquirer
    .prompt([
      {
        name: "teamName",
        type: "input",
        message: "What is the team's name?",
      },
      {
        name: "name",
        type: "input",
        message: "What is the manager's name?",
      },
      {
        name: "id",
        type: "number",
        message: "What is their ID #?",
      },
      {
        name: "email",
        type: "input",
        message: "What is their email?",
      },
      {
        name: "office",
        type: "number",
        message: "What is their office number?",
      },
    ])
    .then((res) => {
      teamName = res.teamName;
      const newManager = new Manager(res.name, res.id, res.email, res.office);
      createCard(newManager, "Manager");
      team.push(newManager);
      promptNext();
    });
};

// prompt user for engineer details, call createcard function with new engineer object, then prompt next
const createEngineer = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the engineers's name?",
      },
      {
        name: "ID",
        type: "number",
        message: "What is their ID #?",
      },
      {
        name: "email",
        type: "input",
        message: "What is their email?",
      },
      {
        name: "github",
        type: "input",
        message: "What is their github username?",
      },
    ])
    .then((res) => {
      const newEngineer = new Engineer(res.name, res.id, res.email, res.github);
      createCard(newEngineer, "Engineer");
      team.push(newEngineer);
      promptNext();
    });
};

// prompt user for inter details, call createcard function with new intern object, then prompt next
const createIntern = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the intern's name?",
      },
      {
        name: "ID",
        type: "number",
        message: "What is their ID #?",
      },
      {
        name: "email",
        type: "input",
        message: "What is their email?",
      },
      {
        name: "school",
        type: "input",
        message: "What school do they attend?",
      },
    ])
    .then((res) => {
      const newIntern = new Intern(res.name, res.id, res.email, res.school);
      createCard(newIntern, "Intern");
      team.push(newIntern);
      promptNext();
    });
};

const promptNext = () => {
  inquirer
    .prompt([
      {
        name: "next",
        type: "list",
        choices: ["Add Engineer", "Add Intern", "Finish Team"],
        message: "What would you like to do next?",
      },
    ])
    .then((res) => {
      console.log(res.next);
      switch (res.next) {
        case "Add Engineer":
          createEngineer();
          break;
        case "Add Intern":
          createIntern();
          break;
        case "Finish Team":
          createWebsite();
      }
    });
};

const createCard = (person, role) => {
    let extra;
    let info;
    switch (role) {
        case "Manager":
            extra = "Office Number"
            info = person.office
            break;
        case "Engineer":
            extra = "Github"
            info = `<a href="https://github.com/${person.github}" target="_blank">${person.github}</a>`
            break;
        case "Intern":
            extra = "School"
            info = person.school
            break;

    }
    const cardHtml =
  `<div class="card col-3 mb-3">
      <div class="card-body">
          <h5 class="card-title">${person.name}</h5>
          <h6 class="card-subtitle">${role}</h6>
          <ul class="card-text">
              <li>ID: ${person.id}</li>
              <li>Email: <a href="mailto:${person.email}" target="_blank" class="btn btn-primary">${person.email}</a></li>
              <li>${extra}: ${info}</li>
          </ul>
      </div>
  </div>`
  employeeCards.push(cardHtml)
};

const createWebsite = () => {
    let cards = "";
    employeeCards.forEach(element => {
        cards += element
    });
    const template = 
    `<!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="./assets/css/style.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <title>${teamName}</title>
      </head>
      <body>
        <header>
            <h1>Welcome to ${teamName}'s Roster!</h1>
        </header>  
        <hr>
        <main class="container">
    
                <div class="row ">
                  ${cards}
    
                </div>
        </main>
        <footer>
            <h4></h4>
        </footer>
    
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        <script src="./assets/js/script.js"></script>
      </body>
    </html>`
    fs.writeFile(`${teamName}.html`, template, (err) =>
    err ? console.error(err) : console.log('Commit logged!')
    );
}

createManager();
