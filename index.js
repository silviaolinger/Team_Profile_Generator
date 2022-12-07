// node modules
const inquirer = require("inquirer");
const fs = require("fs");
const generateTeam = require("./src/page.template.js");

// lib modules
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

// Array for answers to questions
const newmebersdata = [];

// Array object questions asked in CLI to user
const questions = async () => {
  const answers = await inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your ID?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "list",
        message: "What is your role?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager"],
      },
    ])


    
    //  console.log(answers);
      // if manager selected, answer these specific question
      if (answers.role === "Manager") {
        const managerdata = await inquirer
          .prompt([
            {
              type: "input",
              message: "What is your office number",
              name: "officeNumber",
            },
          ])
          const newManager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            managerdata.officeNumber
          );
          newmebersdata.push(newManager);
          
        // if engineer selected answer these set of questions
      } else if (answers.role === "Engineer") {
        const githubData = await inquirer
          .prompt([
            {
              type: "input",
              message: "What is your GitHub user name?",
              name: "github",
            }
          ])
            const newEngineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              githubData.github
            );
            newmebersdata.push(newEngineer);
          
        // if intern selected answer these set of questions
      } else if (answers.role === "Intern") {
        const internAns = await inquirer
          .prompt([
            {
              type: "input",
              message: "Which university did you attend?",
              name: "school",
            },
          ])
          
          const newIntern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            internAns.school
          );
          newmebersdata.push(newIntern);          
      } 

}; //end of questions function

async function promptQuestions() {
  await questions()
    
  
  const addMemberAns = await inquirer
    .prompt([
      {
        name:'addMember',
        type: 'list',
        choices: ['Add a new member', 'Create team'],
        message: "What would you like to do next?"
      }
    ])

    if (addMemberAns.addMember === 'Add a new member') {
      return promptQuestions()
    }
    return createTeam();
}  

promptQuestions();

function createTeam () {
  console.log("new guy", newmebersdata)
  fs.writeFileSync(
    "./output/index.html",
    generateTeam(newmebersdata),
    "utf-8"
  );
}