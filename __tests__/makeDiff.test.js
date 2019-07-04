import fs from 'fs';
import makeDiff from '../src';

const pathToFile1 = `${__dirname}/__fixtures__/__flatStructure__/__json__/before.json`;
const pathToFile2 = `${__dirname}/__fixtures__/__flatStructure__/__json__/after.json`;

const pathToFile3 = `${__dirname}/__fixtures__/__flatStructure__/__yml__/before.yml`;
const pathToFile4 = `${__dirname}/__fixtures__/__flatStructure__/__yml__/after.yml`;

const pathToFile5 = `${__dirname}/__fixtures__/__flatStructure__/__ini__/before.ini`;
const pathToFile6 = `${__dirname}/__fixtures__/__flatStructure__/__ini__/after.ini`;


const pathToFile7 = `${__dirname}/__fixtures__/__recursiveStructure__/__json__/before.json`;
const pathToFile8 = `${__dirname}/__fixtures__/__recursiveStructure__/__json__/after.json`;

const pathToFile9 = `${__dirname}/__fixtures__/__recursiveStructure__/__yml__/before.yml`;
const pathToFile10 = `${__dirname}/__fixtures__/__recursiveStructure__/__yml__/after.yml`;

const pathToFile11 = `${__dirname}/__fixtures__/__recursiveStructure__/__ini__/before.ini`;
const pathToFile12 = `${__dirname}/__fixtures__/__recursiveStructure__/__ini__/after.ini`;

/*
fs.writeFileSync(`${__dirname}/__fixtures__/__flatStructure__/
__testResult__/plain.txt`, makeDiff(pathToFile1, pathToFile2, 'plain'));

fs.writeFileSync(`${__dirname}/__fixtures__/__recursiveStructure__/
__testResult__/plain.txt`, makeDiff(pathToFile7, pathToFile8, 'plain'));
*/

const standardFlatTestResult = fs.readFileSync(`${__dirname}/__fixtures__/__flatStructure__/__testResult__/standard.txt`, 'utf8');
const plainFlatTestResult = fs.readFileSync(`${__dirname}/__fixtures__/__flatStructure__/__testResult__/plain.txt`, 'utf8');

const standardRecTestResult = fs.readFileSync(`${__dirname}/__fixtures__/__recursiveStructure__/__testResult__/standard.txt`, 'utf8');
const plainRecTestResult = fs.readFileSync(`${__dirname}/__fixtures__/__recursiveStructure__/__testResult__/plain.txt`, 'utf8');

test.each([[`${pathToFile1}`, `${pathToFile2}`, standardFlatTestResult], [`${pathToFile3}`, `${pathToFile4}`, standardFlatTestResult], [`${pathToFile5}`, `${pathToFile6}`, standardFlatTestResult]])(
  'makeDiff using files with the flat data structure and standard output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter)).toBe(testResult);
  },
);

test.each([[`${pathToFile1}`, `${pathToFile2}`, plainFlatTestResult], [`${pathToFile3}`, `${pathToFile4}`, plainFlatTestResult], [`${pathToFile5}`, `${pathToFile6}`, plainFlatTestResult]])(
  'makeDiff using files with the flat data structure and plain output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'plain')).toBe(testResult);
  },
);

test.each([[`${pathToFile7}`, `${pathToFile8}`, standardRecTestResult], [`${pathToFile9}`, `${pathToFile10}`, standardRecTestResult], [`${pathToFile11}`, `${pathToFile12}`, standardRecTestResult]])(
  'makeDiff using files with the recursive data structure and standard output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter)).toBe(testResult);
  },
);

test.each([[`${pathToFile7}`, `${pathToFile8}`, plainRecTestResult], [`${pathToFile9}`, `${pathToFile10}`, plainRecTestResult], [`${pathToFile11}`, `${pathToFile12}`, plainRecTestResult]])(
  'makeDiff using files with the recursive data structure and plain output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'plain')).toBe(testResult);
  },
);
