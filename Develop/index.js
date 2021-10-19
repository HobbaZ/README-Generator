// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

inquirer
.prompt([
    {
    name: 'title',
    type: 'input',
    message: 'What is the project title?',
    },

    {
    name: 'description',
    type: 'input',
    message: 'Write a description of the project',
    },

    {
    name: 'install',
    type: 'input',
    message: 'What requirements are needed to run this project?',
    },

    {
    name: 'usage',
    type: 'input',
    message: 'How do you use the project?',
    },


    {
    name: 'contribute',
    type: 'input',
    message: 'Who contributed to the project?',
    },

    {
    name: 'acknowledgements',
    type: 'input',
    message: 'What other assets did you use to help create this project? E.g. Used font from Google Fonts, \
    Bootstrap for layout',
    },   

    {
    name: 'testing',
    type: 'input',
    message: 'What tests can be performed on the project?',
    },

    {
    name: 'github',
    type: 'input',
    message: 'What is your Github username?',
    },

    {
    name: 'email',
    type: 'input',
    message: 'What is your email address?',
    }

])

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
