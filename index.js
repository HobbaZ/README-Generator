//Get all needed requirements
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

  The aim of this project was to create a professional README generator.

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

  //User Story
  {
  name: 'userStory',
  type: 'input',
  message: 'Describe the wanted features of the program',
  default: `
  As A USER I Want a program that helps me create readme documentation quickly by generating sections with my desired input
  WHEN I run the program in Terminal
  THEN I am prompted to enter information about my project, section by section
  `,
  validate: function(userStory) {
		if (userStory) {
			return true;
		} else {
      return 'Please create a user story for your project README.';
    }
	}
  },

  //Screenshots
  {
  //Photo by <a href="https://unsplash.com/@afgprogrammer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mohammad Rahmani</a> on <a href="https://unsplash.com/s/photos/github?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
  name: 'screenshots',
  type: 'input',
  message: 'What screenshots would you like to display?',
  default: '![Image of colour lit keyboard](/Develop/assets/images/mohammad-rahmani-lPKIb8dJ8kw-unsplash.jpg)',//example screenshot
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
      return 'Please enter the install requirements of your project.';
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
  2. Initialize npm by opening a termimal on your project (Terminal - new Terminal) and type npm init -y, wait for it to finish
  3. Install npm by typing npm i, wait for it to finish
  4. Edit the default question inputs to your liking (this will reduce repetitive typing and allow you to just press enter for prompts)
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
      return 'Please enter the names of any contributors and contribution process.';
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
  choices: ['MIT', 'ISC', 'APACHE 2.0', 'THE UNLICENSE', 'GNU AGPLv3', 'GNU GPLv3'],
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

const generateREADME = (answers) => 

`
# ${answers.title}<hr>
${genBadge(answers)}

## Description
${answers.description}<br><br>

## Table of Contents
- [Description](#description)
- [User Story](#userStory)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Technology](#technology)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)
- [Testing](#testing)
- [License](#license)
- [Questions](#questions)<br><br>

## User Story
${answers.userStory}
<br>

## Screenshots
${answers.screenshots}
<br>

## Installation
You will need: 
${answers.installation}
<br>

## Usage
${answers.usage}
<br>

## Technology
${genTechnology(answers)}
<br>
 
## Contributors
${answers.contributors}
<br>

## Acknowledgements
${genAcknowledgements(answers)}
<br>

## Testing
${answers.testing}
<br>

## License
${answers.license}
<br>

## Questions
Find me on Github at [${answers.github}](https://github.com/${answers.github})

Email me at [${answers.email}](${answers.email})
`;

const init = () => {

  console.log(`
              ____________________README GENERATOR______________________

                  Follow the prompts to generate a professional README
                  
                  `)
    promptUser()
      .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
      .then(() => console.log(`
                                      Finished!

                            Successfully created README.md
      `))
      .catch((err) => console.error(err));
  };

  
  init();
