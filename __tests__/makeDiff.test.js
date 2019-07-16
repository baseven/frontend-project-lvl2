import fs from 'fs';
import makeDiff from '../src';

const path = `${__dirname}/__fixtures__/__recursiveStructure__/`;

const getPathToFile = (extension, name) => `${path}__${extension}__/${name}.${extension}`;

const getTestResult = filename => fs.readFileSync(`${path}__testResult__/${filename}`, 'utf8');

const getTestParameters = (extension, filename) => [getPathToFile(extension, 'before'), getPathToFile(extension, 'after'), getTestResult(filename)];

const arrayOfExtensions = ['json', 'yml', 'ini'];

const getTestTable = (extensions, filename) => extensions.map(v => getTestParameters(v, filename));

test.each(getTestTable(arrayOfExtensions, 'pretty.txt'))(
  'makeDiff using pretty output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter)).toBe(testResult);
  },
);

test.each(getTestTable(arrayOfExtensions, 'plain.txt'))(
  'makeDiff using plain output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'plain')).toBe(testResult);
  },
);

test.each(getTestTable(arrayOfExtensions, 'json.json'))(
  'makeDiff using json output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'json')).toBe(testResult);
  },
);
