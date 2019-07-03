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
flatStrTestResult.txt`, makeDiff(pathToFile1, pathToFile2));

fs.writeFileSync(`${__dirname}/__fixtures__/__recursiveStructure__/
recStrTestResult.txt`, makeDiff(pathToFile7, pathToFile8));
*/

const flatStrTestResult = fs.readFileSync(`${__dirname}/__fixtures__/__flatStructure__/flatStrTestResult.txt`, 'utf8');
const recStrTestResult = fs.readFileSync(`${__dirname}/__fixtures__/__recursiveStructure__/recStrTestResult.txt`, 'utf8');


test.each([[`${pathToFile1}`, `${pathToFile2}`, flatStrTestResult], [`${pathToFile3}`, `${pathToFile4}`, flatStrTestResult], [`${pathToFile5}`, `${pathToFile6}`, flatStrTestResult]])(
  'makeDiff using files with the flat data structure',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter)).toBe(testResult);
  },
);

test.each([[`${pathToFile7}`, `${pathToFile8}`, recStrTestResult], [`${pathToFile9}`, `${pathToFile10}`, recStrTestResult], [`${pathToFile11}`, `${pathToFile12}`, recStrTestResult]])(
  'makeDiff using files with the recursive data structure',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter)).toBe(testResult);
  },
);
