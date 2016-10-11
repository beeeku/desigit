#!/usr/bin/env node

'use strict';
/**
 * Require dependencies
 *
 */
const program = require('commander'),
    chalk = require("chalk"),
    exec = require('child_process').exec,
    pkg = require('./package.json');
/**
 * list function definition
 *
 */
const cmd = 'git';

const outputlog = (parameterizedCommand) => {
    let output = (error, stdout, stderr) => {
        if (error) console.log(chalk.red.bold.underline("exec error:") + error);
        if (stdout) console.log(chalk.green.bold.underline("Result:") + stdout);
        if (stderr) console.log(chalk.red("Error: ") + stderr);
    };

    exec(parameterizedCommand, output);
};
let status = () => {
    let parameterizedCommand = cmd + ' status';
    outputlog(parameterizedCommand);
};
let diff = (options) => {
    let parameterizedCommand = cmd + ' diff';
    if(options.staged) parameterizedCommand += '--staged';
    outputlog(parameterizedCommand);
};
let add = (file) => {
    let parameterizedCommand = cmd + ' add';
    if (file) parameterizedCommand += ' '+file;
    outputlog(parameterizedCommand);
};
let commit = (message) => {
    let parameterizedCommand = cmd + ' commit -m';
    if (message) parameterizedCommand += ' "'+message+'"';
    outputlog(parameterizedCommand);
};
let reset = (commit,options) => {
    let parameterizedCommand = cmd + ' reset';
    if (options.hard) parameterizedCommand += ' --hard';
    if (commit) parameterizedCommand += ' '+commit;
    outputlog(parameterizedCommand);
};
let branch = (branchName,options) => {
    let parameterizedCommand = cmd + ' branch';
    let params = [];

    if (options.delete) params.push("d");
    parameterizedCommand = params.length ? parameterizedCommand + ' -' + params.join('') : parameterizedCommand ;
    if (branchName) parameterizedCommand += ' ' + branchName ;
    outputlog(parameterizedCommand);
};
let checkout = (branch) => {
    let parameterizedCommand = cmd + ' checkout';
    if (branch) parameterizedCommand += ' ' + branch;
    outputlog(parameterizedCommand);
};
let merge = (branch) => {
    let parameterizedCommand = cmd + ' merge';
    if (branch) parameterizedCommand += ' ' + branch;
    outputlog(parameterizedCommand);
};
let init = (projectName) => {
    let parameterizedCommand = cmd + ' init';
    if (projectName) parameterizedCommand += ' ' + projectName;
    outputlog(parameterizedCommand);
};
let clone = (url) => {
    let parameterizedCommand = cmd + ' clone';
    if (url) parameterizedCommand += ' ' + url;
    outputlog(parameterizedCommand);
};
let log = () => {
    let parameterizedCommand = cmd + ' log';
    outputlog(parameterizedCommand);
};
let show = (commit) => {
    let parameterizedCommand = cmd + ' show';
    if (commit) parameterizedCommand += ' ' + commit;
    outputlog(parameterizedCommand);
};
let fetch = (bookmark) => {
    let parameterizedCommand = cmd + ' fetch';
    if (bookmark) parameterizedCommand += ' ' + bookmark;
    outputlog(parameterizedCommand);
};
let push = (alias, branch) => {
    let parameterizedCommand = cmd + ' push';
    if (alias) parameterizedCommand += ' ' + alias;
    if (branch) parameterizedCommand += ' ' + branch;
    outputlog(parameterizedCommand);

};
let pull = () => {
    let parameterizedCommand = cmd + ' pull';
    outputlog(parameterizedCommand);
};

program
    .version(pkg.version)
    .command('ki_haal')
    .action(status);
program
    .command('kheench')
    .action(pull);
program
    .command('pell [alias] [branch]')
    .action(push);
program
    .command('laa [bookmark]')
    .action(fetch);
program
    .command('dikha [commit]')
    .action(show);
program
    .command('pichla')
    .action(log);
program
    .command('nakal [url]')
    .action(clone);
program
    .command('aarambh [projectName]')
    .action(init);
program
    .command('milade [branch]')
    .action(merge);
program
    .command('ghur [branch]')
    .action(checkout);
program
    .command('shakha [branchName]')
    .option('-d,--delete', 'Saakha ko kaat dein')
    .action(branch);
program
    .command('wapis [commit]')
    .option('--hard', 'dardank reset kardein')
    .action(reset);
program
    .command('kar diya "[message]"')
    .action(commit);
program
    .command('daalo [file]')
    .action(add);
program
    .command('antarr')
    .option('--staged','Shows file differences between staging and the last file version')
    .action(diff);
program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();
