#!/usr/bin/env node

import program from 'commander';

program
  .version('0.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstFile, secondFile) => {
    console.log('The difference between the first and second file:');
    console.log(`${firstFile}`);
    console.log(`${secondFile}`);
  })
  .parse(process.argv);
