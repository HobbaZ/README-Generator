//Get all neede requirements
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
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
    name: 'features',
    type: 'input',
    message: 'List the project features e.g. frameworks used, programming languages used',
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
    name: 'license',
    type: 'list',
    message: 'What license do you need for the project?',
    choices: ['MIT', 'ISC', 'AFL', 'APACHE 2.0', 'ARTISTIC', 'CC', 'CC ZERO UNIVERSAL', 'CC ATTRIBUTION']
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
    },
]);
};

function genBadge(answers) {
  const licenseType = answers.license;
  let licenseStr = '';
  if (answers.license) {
    licenseStr = `![License](https://img.shields.io/badge/License-${answers.license}-blue.svg)`
  } else {
    licenseStr = '';
  }
  return licenseStr;
}

const generateREADME = (answers) => 

`
# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)

## Installation
${answers.install}

## Usage
${answers.usage}

## Features
${answers.features}

//Link github to 
## Contributors
[${answers.contribute}](https://github.com/HobbaZ)

## Aknowledgements
${answers.acknowledgements}

## License
${genBadge(answers)}

## Testing
${answers.testing}

## Questions
Find me on Github at [${answers.github}](https://github.com/${answers.github})

Email me at [${answers.email}](${answers.email})
`;

const init = () => {
    promptUser()
      .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
      .then(() => console.log('Successfully created README.md'))
      .catch((err) => console.error(err));
  };

  
  init();
