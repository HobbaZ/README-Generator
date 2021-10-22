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
    message: 'Enter a project title (Hint: same as Github Repo)',
    default: 'README-Generator',
    validate: function(title) {
			if (title) {
				return true;
			} else {
        return 'Please create a title for your README.';
      }
		},

  },
    

  {
  name: 'description',
  type: 'input',
  message: 'Write a description of the project',
  default: '<h5>Project Aim</h5>The aim of this project was to create a README generator as per the specifications of my homework assignment.<h5>What Problem Does It Solve</h5>The generator enables me to produce faster and more efficient README documentation<h5>What I Learnt</h5>in making this project, I learnt how to use Node.js, string literals, inquirer and validating inputs'
  ,
  validate: function(description) {
		if (description) {
			return true;
		} else {
      return 'Please create a description for your project README.';
    }
	}
  },

    {
    name: 'installation',
    type: 'input',
    message: 'What requirements are needed to run this project?',
    validate: function(install) {
			if (install) {
				return true;
			} else {
        return 'Please enter the install process of your project.';
      }
		}
    },

    {
    name: 'usage',
    type: 'input',
    message: 'How do you use the project?',
    validate: function(usage) {
			if (usage) {
				return true;
			} else {
        return 'Please create step by step how to use process for your project';
      }
		}
    },

    {
    name: 'technology',
    type: 'input',
    message: 'List the project features e.g. frameworks used, programming languages used with comma seperator E.g. HTML,CSS',
    //Fill out technology used here with comma separarators
    default: 'JavaScript,Node.js,npm,inquirer',
    validate: function(features) {
			if (features) {
				return true;
			} else {
        return 'Please enter the frameworks used.';
      }
		}
    },

    //Replace default name with your name
    {
    name: 'contributors',
    type: 'input',
    message: 'Who contributed to the project and how can others contribute? (You are also a contributor)',
    default: 'Zachary Hobba',
    },

    {
    name: 'acknowledgements',
    type: 'input',
    message: 'What other assets did you use to help create this project? E.g. Used font from Google Fonts, \
    Bootstrap for layout',
    //input full addresses here separated by come
    default: 'https://www.npmjs.com/package/inquirer#questions,https://choosealicense.com/,https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide,https://github.com/SBoudrias/Inquirer.js'
    },   

    {
    name: 'testing',
    type: 'input',
    message: 'What tests can be performed on the project?',
    default: 'npm tests',
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
    default: 'HobbaZ'
    },

    {
    name: 'email',
    type: 'input',
    message: 'What is your email address?',
    default: 'zachobba@gmail.com',
    validate: function(email) {
			let test = email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
			if (test) {
				return true;
			} else {
        return 'Please enter a valid email.';
      }
		}
  },

  ]);
};

function genTechnology(answers) {
  let format = '';
  if (answers.technology) {
    format = answers.technology.split(",").join("<br>");
  } else {
    format = '';
  }
  return format;
}

function genBadge(answers) {
  let licenseStr = '';
  if (answers.license) {
    const licenseLink = answers.license.toLowerCase();
    licenseStr = `[![License](https://img.shields.io/badge/License-${answers.license}-blue.svg)](https://choosealicense.com/licenses/${licenseLink}/)`
  } else {
    licenseStr = '';
  }
  return licenseStr;
}

function genAcknowledgements(answers) {
  let format = '';
  if (answers.acknowledgements) {
    format = answers.acknowledgements.split(",").join("<br><br>");
  } else {
    format = '';
  }
  return format;
}

/*function genTableofContents(answers) {

  answeredPrompts =[]

  if(answers.length !== 0) {
    answeredPrompts.push(Object.getOwnPropertyNames(answers));
  }
    let toc = '##Table of Contents';

    for (let index = 0; index < answeredPrompts.length; index++) {
      toc += `\n[${answeredPrompts[index]}](#${answeredPrompts[index]})\n`;
    }
    return toc;
}*/

const generateREADME = (answers) => 

`
# ${answers.title}

## Description
${answers.description}

## Table of Contents
[Description](#description)
[Installation](#installation)
[Usage](#usage)
[Technology](#technology)
[Contributors](#contributors)
[Aknowledgements](#acknowledgements)
[Testing](#testing)
[License](#license)
[Questions](#questions)

## Installation
${answers.install}

## Usage
${answers.usage}

## Technology
${genTechnology(answers)}
 
## Contributors
[${answers.contributors}](https://github.com/HobbaZ)

## Aknowledgements
${genAcknowledgements(answers)}

## Testing
${answers.testing}

## License
${genBadge(answers)}

## Questions
Find me on Github at [${answers.github}](https://github.com/${answers.github})

Email me at [${answers.email}](${answers.email})
`;

const init = () => {

  console.log("____________________README GENERATOR______________________\n Follow the prompts to generate a professional README")
    promptUser()
      .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
      .then(() => console.log('Successfully created README.md'))
      .catch((err) => console.error(err));
  };

  
  init();
