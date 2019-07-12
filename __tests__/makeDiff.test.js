import fs from 'fs';
import makeDiff from '../src';

const path = `${__dirname}/__fixtures__/__recursiveStructure__/`;

const getPathToFile = (extension, name) => `${path}__${extension}__/${name}.${extension}`;

const getTestResult = filename => fs.readFileSync(`${path}__testResult__/${filename}`, 'utf8');

test.each([
  [`${getPathToFile('json', 'before')}`, `${getPathToFile('json', 'after')}`, getTestResult('pretty.txt')],
  [`${getPathToFile('yml', 'before')}`, `${getPathToFile('yml', 'after')}`, getTestResult('pretty.txt')],
  [`${getPathToFile('ini', 'before')}`, `${getPathToFile('ini', 'after')}`, getTestResult('pretty.txt')],
])(
  'makeDiff using pretty output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter)).toBe(testResult);
  },
);

test.each([
  [`${getPathToFile('json', 'before')}`, `${getPathToFile('json', 'after')}`, getTestResult('plain.txt')],
  [`${getPathToFile('yml', 'before')}`, `${getPathToFile('yml', 'after')}`, getTestResult('plain.txt')],
  [`${getPathToFile('ini', 'before')}`, `${getPathToFile('ini', 'after')}`, getTestResult('plain.txt')],
])(
  'makeDiff using plain output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'plain')).toBe(testResult);
  },
);

test.each([
  [`${getPathToFile('json', 'before')}`, `${getPathToFile('json', 'after')}`, getTestResult('json.json')],
  [`${getPathToFile('yml', 'before')}`, `${getPathToFile('yml', 'after')}`, getTestResult('json.json')],
  [`${getPathToFile('ini', 'before')}`, `${getPathToFile('ini', 'after')}`, getTestResult('json.json')],
])(
  'makeDiff using json output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'json')).toBe(testResult);
  },
);
