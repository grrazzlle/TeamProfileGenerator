const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

(async function() {
  // Write code to use inquirer to gather information about the development team members,
  // and to create objects for each team member (using the correct classes as blueprints!)
  const roleQuestions = [
    {
      type: 'list',
      name: 'role',
      message: 'What is their role',
      choices: ['Engineer', 'Intern'],
    },
  ];

  const employeeQuestions = [
    {
      message: 'What is their name?',
      name: 'name',
      validate: (x) => !!x,
    },
    {
      message: 'What is their ID?',
      name: 'id',
      validate: (x) => !!x,
    },
    {
      message: 'What is their email?',
      name: 'email',
      validate: (x) => !!x,
    },
  ];

  const ManagerQuestions = [
    {
      message: 'What is their office number?',
      name: 'officeNumber',
      validate: (x) => !!x,
    },
  ];

  const askManager = [...employeeQuestions, ...ManagerQuestions];

  const EngineerQuestions = [
    {
      message: 'What is their github username?',
      name: 'github',
      validate: (x) => !!x,
    },
  ];

  const askEngineer = [...employeeQuestions, ...EngineerQuestions];

  const InternQuestions = [
    {
      message: 'What is their schools name?',
      name: 'school',
      validate: (x) => !!x,
    },
  ];
  const addEmployeeQuestions = [
    {
      type: 'list',
      name: 'add',
      message: 'Are there any other employees to add?',
      choices: ['Yes', 'No'],


    },
  ];
  const askIntern = [...employeeQuestions, ...InternQuestions];

  console.log('Please enter the managers info.');
  const managerAnswer = await inquirer.prompt(askManager);
  const employeeArray = [];
  employeeArray.push(new Manager(managerAnswer.name, managerAnswer.id, managerAnswer.email, managerAnswer.officeNumber));

  async function addEmployee() {
    const addAnswer = await inquirer.prompt(addEmployeeQuestions);
    if (addAnswer.add == 'No') {
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
      }
      fs.writeFileSync(outputPath, render(employeeArray));
      console.log('File created successfully');
      return;
    }
    const roleAnswer = await inquirer.prompt(roleQuestions);
    if (roleAnswer.role == 'Engineer') {
      const EngineerAnswer = await inquirer.prompt(askEngineer);
      employeeArray.push(new Engineer(EngineerAnswer.name, EngineerAnswer.id, EngineerAnswer.email, EngineerAnswer.github));
    } else if (roleAnswer.role == 'Intern') {
      const InternAnswer = await inquirer.prompt(askIntern);
      employeeArray.push(new Intern(InternAnswer.name, InternAnswer.id, InternAnswer.email, InternAnswer.school));
    }
    await addEmployee();
  };
  await addEmployee();

  // After the user has input all employees desired, call the `render` function (required
  // above) and pass in an array containing all employee objects; the `render` function will
  // generate and return a block of HTML including templated divs for each employee!

  // After you have your html, you're now ready to create an HTML file using the HTML
  // returned from the `render` function. Now write it to a file named `team.html` in the
  // `output` folder. You can use the variable `outputPath` above target this location.
  // Hint: you may need to check if the `output` folder exists and create it if it
  // does not.

  // HINT: each employee type (manager, engineer, or intern) has slightly different
  // information; write your code to ask different questions via inquirer depending on
  // employee type.

  // HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
  // and Intern classes should all extend from a class named Employee; see the directions
  // for further information. Be sure to test out each class and verify it generates an
  // object with the correct structure and methods. This structure will be crucial in order
  // for the provided `render` function to work! ```
}());
