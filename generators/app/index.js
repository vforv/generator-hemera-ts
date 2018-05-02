'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the incredible ${chalk.red('generator-hemera-ts')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'servicePrefix',
        message: 'Enter prefix for your service.',
        default: 'titan'
      },
      {
        type: 'input',
        name: 'serviceName',
        message: 'Enter service name(if multiple words separate with -)?',
        default: 'ping'
      },
      {
        type: 'input',
        name: 'serviceDesc',
        message: 'Describe this service?',
        default: 'This service use just for testing it will create ping date route which return date.'
      },
      {
        type: 'input',
        name: 'serviceAuthor',
        message: 'Full name of service main maintaine?',
        default: 'Vladimir Djukic'
      },
      {
        type: 'input',
        name: 'coverage',
        message: 'Enter how much (%) should be minimum for this service? (Put number from 1-100)',
        default: '100'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;

      if (this.props.serviceName.length > 21) {
        this.log(chalk.red('Service name should be less then 22 char in length.'));
        process.exit();
      }

      if (/^[a-z- ]*$/.test(this.props.serviceName) == false) {
        this.log(chalk.red('Service name must be lowecase and multiple words should be separated with (-).'));
        process.exit();
      }

      if (this.props.serviceName.slice(-1) == '-' || this.props.serviceName.charAt(0) == '-') {
        this.log(chalk.red('Service name should not contain (-) on the end and begining.'));
        process.exit();
      }

      if (this.props.serviceName.slice(-1) == '-' || this.props.serviceName.charAt(0) == '-') {
        this.log(chalk.red('Service name should not contain (-) on the end and begining.'));
        process.exit();
      }

      if (this.props.serviceDesc.length < 20) {
        this.log(chalk.red('Service description should be at last 20 char long.'));
        process.exit();
      }

      if (parseInt(this.props.coverage) > 100 || parseInt(this.props.coverage) < 1) {
        this.log(chalk.red('Coverage should be between 1 and 100'));
        process.exit();
      }
    });
  }

  writing() {
    let serviceName = this.props.serviceName;

    let servicePrefix = this.props.servicePrefix;

    const withPrefix = `${servicePrefix}-${serviceName}`

    let pro = Object.assign({}, this.props);

    pro.nameWithPrefix = withPrefix;

    pro.prefixConst = servicePrefix.toUpperCase();

    pro.serviceFullName = withPrefix
      .split('-')
      .map(word => word.trim())
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    pro.serviceCC = this.props.serviceName
      .split('-')
      .map(word => word.trim())
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      pro
    );

    this.fs.copyTpl(
      this.templatePath('service/_env'),
      this.destinationPath(`${servicePrefix}-${serviceName}/.env`),
      pro
    );

    this.fs.copyTpl(
      this.templatePath('service/_gitignore'),
      this.destinationPath(`${servicePrefix}-${serviceName}/.gitignore`),
      pro
    );

    this.fs.copyTpl(
      this.templatePath('service/_dockerignore'),
      this.destinationPath(`${servicePrefix}-${serviceName}/.dockerignore`),
      pro
    );

    this.fs.copyTpl(
      this.templatePath('service/src/model/_service.model.ts'),
      this.destinationPath(`${servicePrefix}-${serviceName}/src/model/${serviceName}.model.ts`),
      pro
    );

    // if (this.props.crud) {

    // } else {

    // }

    this.fs.move(
      this.destinationPath('service/**'),
      this.destinationPath(`${servicePrefix}-${serviceName}`)
    )

  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }
};
