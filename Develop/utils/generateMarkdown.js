// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
if (license) {
  ![badge]
} else {
  return " ";
}
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {

}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `
  # ${data.title}

  ## Description
  ${data.description}
  ## Table of Contents
  - [Description](#description)

  ## Installation
  ${data.install}

  ## Usage
  ${data.usage}

  ## Features
  ${data.features}

  ## Contributors
  ${data.contrbutors}

  ## Aknowledgements
  ${data.aknowledgements}

  ## License
  ${data.license}

  ## Testing
  ${data.tests}

  ## Questions
  Find me on ${data.github}
  Email me at ${data.email}`
;
}

module.exports = generateMarkdown;
