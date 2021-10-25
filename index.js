//Get all needed requirements
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

//use in built date function to get year (could use moment but that means another dependency)
const currentYear = new Date().getFullYear();

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([

  //Name
  {
  name: 'yourName',
  type: 'input',
  message: 'Enter your name',
  default: 'Zachary Hobba', //change to your name
  validate: function(yourName) {
    if (yourName) {
      return true;
    } else {
      return 'Please enter your name.';
    }
  }
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
  }
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
  Which you can [view here](https://github.com/HobbaZ/README-Generator)

  <h3>What Problem Does It Solve</h3>

  The generator enables you to produce more efficient README documentation, spending less time on documentation and 
  more time on making your project come to life. With sections for the repo title, project description, installation, user story, screenshots, contributors sections and more,
  it'll give you that professional README look straight out of the box, of course you can also add and remove sections as you like.

  <h3>What I Learnt</h3>

  in making this project, I learnt how to use Node.js, string literals, inquirer and validating inputs.
  ` //These are back ticks, not commas, the wavy key between esc and tab
  //replace the view here link with your own deployed repo
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
  name: 'userstory',
  type: 'input',
  message: 'Describe the wanted features of the program',
  default: `
  As A USER I Want a program that helps me create readme documentation quickly by generating sections with my desired input.

  WHEN I run the program in Terminal

  THEN I am prompted to enter information about my project, section by section.

  WHEN I finish inputting my information

  THEN a README file is generated with a basic professional layout.
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
  name: 'screenshots',
  type: 'input',
  message: 'What screenshots would you like to display?',
  default: `
  ![gif of program start](/Develop/assets/images/README-gen.gif)
  `,//example screenshot, code in square brackets is alt text, round brackets is link
  },

  //Installation
  {
  name: 'installation',
  type: 'input',
  message: 'What requirements are needed to run this project (separate by comma)?',
  default: 'Node.js, npm, inquirer', //default value can be changed to your value
  
  validate: function(installation) {
    if (installation) {
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
  2. If you don't have node.js on your computer already, download and install it
  3. Install inquirer dependency by opening a termimal on your project (Terminal - new Terminal) and type:

      npm install inquirer 

  4. Edit the default question inputs to your liking (this will reduce repetitive typing and allow you to just press enter for prompts)
  5. Then type in the Terminal "node index.js" and follow the prompts
  6. When you're done, check out your amazing generated readme

  Check out the walk through video [here](https://youtu.be/urMxvyrO1TM)
  `,
  validate: function(usage) {
    if (usage) {
      return true;
    } else {
      return 'Please create step by step process of how to use your project';
    }
  }
  },

  //Features
  {
    name: 'features',
    type: 'input',
    message: 'List the project features e.g. is accessible friendly, color blind mode, controller support',
    //Fill out features
    default: `
    - Validators for each question to check if wrong input entered or no input entered

    - Default answer types
    `,
    validate: function(technology) {
      if (technology) {
        return true;
      } else {
        return 'Please enter the frameworks used.';
      }
    }
    },

  //Technology
  {
  name: 'technology',
  type: 'input',
  message: 'List the project technology e.g. frameworks used, programming languages used with comma separator (E.g. HTML,CSS)',
  //Fill out technology used here with comma separators, no spaces inbetween
  default: 'JavaScript,Node.js,inquirer',
  validate: function(technology) {
    if (technology) {
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
  `// input your name and github link in this default section, repeat for any other contributors
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
  choices: ['MIT', 'APACHE 2.0', 'THE UNLICENSE', 'GNU AGPLv3', 'GNU GPLv3'],
  },

]);
};

function getLicenseLink(answers) {
  let link = ""; //will change to swith statement later
  if (answers.license ==="MIT") {
    link = 'mit';
  } else if (answers.license === "APACHE 2.0") {
    link = "apache-2.0";
  } else if (answers.license === "THE UNLICENSE") {
    link = "unlicense";
  } else if (answers.license === "GNU AGPLv3") {
    link = "agpl-3.0";
  } else if (answers.license === "GNU GPLv3") {
    link = "gpl-3.0";
  }
  return link;
}

function genLicenseInfo(answers) {
  let information = ""; //will change to swith statement later
  if (answers.license === "MIT") {
    information = 
`Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
End license text.`

  } else if (answers.license === "APACHE 2.0") {
    information = 
`Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[Apache 2.0 license link](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`

  } else if (answers.license === "THE UNLICENSE") {
    information =
`This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to [https://unlicense.org](https://unlicense.org)>`

  } else if (answers.license === "GNU AGPLv3") {
`This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

If your software can interact with users remotely through a computer
network, you should also make sure that it provides a way for users to
get its source.  For example, if your program is a web application, its
interface could display a "Source" link that leads users to an archive
of the code.  There are many ways you could offer source, and different
solutions will be better for different programs; see section 13 for the
specific requirements.

You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU AGPL, see
<https://www.gnu.org/licenses/>.`

  } else if (answers.license === "GNU GPLv3") {
`This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see [https://www.gnu.org/licenses](https://www.gnu.org/licenses/).
`
}
  return information;
}


function genTechnology(answers) { //This function generates a list from your technology answers
  let format = '';
  if (answers.technology) {
    format = answers.technology.split(",").join("<br>");
  } else {
    format = '';
  }
  return format;
}

function genBadge(answers) { //This function gets the license you selected, creates a badge and runs getLicenseLink function to insert it into a clickable url
  let licenseStr = ''; //currently only apache, MIT, ISC licenses work
  if (answers.license) {    
    const badge = answers.license.replace(" ", "_"); //spaces need to be converted to underscores in badges

    licenseStr = `[![License](https://img.shields.io/badge/License-${badge}-blue.svg)](https://choosealicense.com/licenses/${getLicenseLink(answers)}/)`
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
- [User Story](#userstory)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Technology](#technology)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)
- [Testing](#testing)
- [License](#license)
- [Questions](#questions)<br><br>

## User Story
${answers.userstory}
<br>

## Screenshots
${answers.screenshots}
<br>

## Installation
You will need: 
${answers.installation}
<br>

## Features
${answers.features}

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

Copyright ${currentYear} ${answers.yourName}

${genLicenseInfo(answers)}
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
