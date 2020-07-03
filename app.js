const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembers = [];

promptManager()
function promptManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "please enter at least one character"
            },
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID?",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }

        },
        {
            type: "input",
            name: "email",
            message: "What is your email?",
            validate: async (input) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "officenumber",
            message: "What is your office number?",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }
        },

    ]).then(function (answers) {
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officenumber)
        teamMembers.push(manager)
        createTeam();

    })
}
function createTeam() {
        inquirer.prompt([{
            type: "list",
            name: "employeeType",
            message: "Do you want to add a new employee?",
            choices: ["Engineer", "Intern", "None"]
        }]).then(function(userChoice) {
            console.log(userChoice);
            switch(userChoice.employeeType) {
                case "Engineer":
                 promptEngineer();
                  break;
                case "Intern":
                  promptIntern();
                  break;
                default:
                  createHTML();
              }
        });
}
function promptIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "please enter at least one character"
            },
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID?",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }

        },
        {
            type: "input",
            name: "email",
            message: "What is your email?",
            validate: async (input) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "school",
            message: "What school do you attend?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "please enter at least one character"
            },

        }
    ]).then(function (answers) {
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(intern);
       createTeam();
    })
}

function promptEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "please enter at least one character"
            },
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID?",
            validate: async (input) => {
                if (isNaN(input)) {
                    return "Please enter a number";
                }
                return true;
            }

        },

        {
            type: "input",
            name: "email",
            message: "What is your email?",
            validate: async (input) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is your github username?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "please enter at least one character"
            },
        }
    ]).then(function (answers) {
        let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        teamMembers.push(engineer)
       createTeam();

    })
}



function createHTML() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    //******  teamMembers in fs.writeFileSync(outPath,render(teamMembers),"utf-8); is the array variable you are pushing team member objects to. IF your array is labeled differently make sure to change it here as well
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}







