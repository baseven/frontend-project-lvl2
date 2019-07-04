#!/usr/bin/env node

import program from 'commander';
import makeDiff from '..';

program
  .version('0.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((pathToFile1, pathToFile2) => {
    const diff = makeDiff(pathToFile1, pathToFile2, program.format);
    console.log(diff);
  })
  .parse(process.argv);
