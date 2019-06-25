#!/usr/bin/env node

import program from 'commander';

program
  .version('0.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstFile, secondFile) => {
    console.log(`The function that handles the values of the transferred files (${firstFile}, ${secondFile}) should be located here.`);
  })
  .parse(process.argv);
