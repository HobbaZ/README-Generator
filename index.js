//Get all neede requirements
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([

  //Title
  {
  name: 'title',
  type: 'input',
  message: 'Enter a project title (Hint: same as Github Repo)',
  default: 'README-Generator', //You can change this to your repo
  validate: function(title) {
    if (title) {
      return true;
    } else {
      return 'Please create a title for your README.';
    }
  },
  },
    
  //Description
  {
  name: 'description',
  type: 'input',
  message: 'Write a description of the project',
  default: //Change description input here
  ` 
  <h3>Project Aim</h3>
  The aim of this project was to create a README generator as per the specifications of my homework assignment.

  <h3>What Problem Does It Solve</h3>
  The generator enables me to produce faster and more efficient README documentation.

  <h3>What I Learnt</h3>
  in making this project, I learnt how to use Node.js, string literals, inquirer and validating inputs
  ` //These are tildes, not commas, key between esc and tab
  ,
  validate: function(description) {
		if (description) {
			return true;
		} else {
      return 'Please create a description for your project README.';
    }
	}
  },

  //Installation
  {
  name: 'installation',
  type: 'input',
  message: 'What requirements are needed to run this project (separate by comma)?',
  default: 'Node.js, npm, inquirer', //default value can be changed to your value
  
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
  default: //change steps to own installation process here
    `
  1. Clone this repository to your computer
  2. Install Node.js
  3. Install npm by opening a termimal on your project (Terminal - new Terminal) and type npm i, wait for it to finish
  4. Install inquirer by typing npm i inquirer in the terminal
  5. Edit the default question inputs to your liking (this will reduce repetitive typing and allow you to just press enter for prompts)
  5. Then type in the Terminal node index.js and follow the prompts
  `,
  validate: function(usage) {
    if (usage) {
      return true;
    } else {
      return 'Please create step by step of how to use process for your project';
    }
  }
  },

  //Technology
  {
  name: 'technology',
  type: 'input',
  message: 'List the project features e.g. frameworks used, programming languages used with comma seperator E.g. HTML,CSS',
  //Fill out technology used here with comma separarators, no spaces inbetween
  default: 'JavaScript,Node.js,npm,inquirer',
  validate: function(features) {
    if (features) {
      return true;
    } else {
      return 'Please enter the frameworks used.';
    }
  }
  },

  //Contributors
  {
  name: 'contributors',
  type: 'input',
  message: 'Who contributed to the project and how can others contribute? (You are also a contributor)',
  default: `
  [Zachary Hobba](https://github.com/HobbaZ)<br>
  You can also contribute by opening a pull request or submitting an issue
  `// input your own name and github link in this default section, repeat for any other contributors
  ,
  validate: function(contributors) {
    if (contributors) {
      return true;
    } else {
      return 'Please enter the names of any contributors.';
    }
  }
  },

  //Acknowledgements
  {
  name: 'acknowledgements',
  type: 'input',
  message: 'What other assets did you use to help create this project? E.g. Used Google Fonts, Bootstrap layout, stackoverflow questions',
  //input full addresses here separated by comma
  default: 'https://www.npmjs.com/package/inquirer#questions,https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba,https://choosealicense.com/,https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide,https://github.com/SBoudrias/Inquirer.js'
  },   

  //Testing
  {
  name: 'testing',
  type: 'input',
  message: 'What tests can be performed on the project?',
  default: 'npm tests',
  },

  //License choices
  {
  name: 'license',
  type: 'list',
  message: 'What license do you need for the project?',
  choices: ['MIT', 'ISC', 'APACHE 2.0', 'THE UNLICENSE', 'BOOST SOFTWARE LICENSE 1.0', 'GNU AGPLv3', 'GNU GPLv3'],
  },

  //Github link
  {
  name: 'github',
  type: 'input',
  message: 'What is your Github username?', 
  default: 'HobbaZ', //change to your username
  validate: function(github) {
    if (github) {
      return true;
    } else {
      return 'Please enter your Github username.';
    }
  }
  },

  //Email link
  {
  name: 'email',
  type: 'input',
  message: 'What is your email address?',
  default: 'zachobba@gmail.com', //change to your email
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

function genTechnology(answers) { //This function generates a list from your technology answers
  let format = '';
  if (answers.technology) {
    format = answers.technology.split(",").join("<br>");
  } else {
    format = '';
  }
  return format;
}

function genBadge(answers) { //This function gets the license you selected and creates a badge and inserts it into a clickable url
  let licenseStr = ''; //currently only apache, MIT, ISC licenses work
  if (answers.license) {    
    let licenseLink = answers.license.replace(" ", "-").toLowerCase();
    const badge = answers.license.replace(" ", "_"); //spaces need to be converted to underscores in badges

    licenseStr = `[![License](https://img.shields.io/badge/License-${badge}-blue.svg)](https://choosealicense.com/licenses/${licenseLink}/)`
  } else {
    licenseStr = '';
  }
  return licenseStr;
}

function genAcknowledgements(answers) { //This function gets the resource links you've entered and places them a space apart down the page
  let format = '';
  if (answers.acknowledgements) {
    format = answers.acknowledgements.split(",").join("<br><br>");
  } else {
    format = '';
  }
  return format;
}

/*function genTableofContents(answers) { //This was an attempt at a generated table of contents

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
# ${answers.title}<hr>
${genBadge(answers)}

## Description
${answers.description}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Technology](#technology)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)
- [Testing](#testing)
- [License](#license)
- [Questions](#questions)

## Installation
You will need: 
${answers.installation}

## Usage
${answers.usage}

## Technology
${genTechnology(answers)}
 
## Contributors
${answers.contributors}

## Acknowledgements
${genAcknowledgements(answers)}

## Testing
${answers.testing}

## License
${answers.license}

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
