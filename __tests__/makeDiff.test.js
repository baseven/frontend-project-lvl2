import fs from 'fs';
import makeDiff from '../src';

const path = `${__dirname}/__fixtures__/__recursiveStructure__/`;

const pathToFile1 = `${path}__json__/before.json`;
const pathToFile2 = `${path}__json__/after.json`;
const pathToFile3 = `${path}__yml__/before.yml`;
const pathToFile4 = `${path}__yml__/after.yml`;
const pathToFile5 = `${path}__ini__/before.ini`;
const pathToFile6 = `${path}__ini__/after.ini`;

const getPrettyTestResult = file => fs.readFileSync(`${path}__testResult__/${file}`, 'utf8');
const getPlainTestResult = file => fs.readFileSync(`${path}__testResult__/${file}`, 'utf8');
const getJsonTestResult = file => fs.readFileSync(`${path}__testResult__/${file}`, 'utf8');

test.each([[`${pathToFile1}`, `${pathToFile2}`, getPrettyTestResult('pretty.txt')], [`${pathToFile3}`, `${pathToFile4}`, getPrettyTestResult('pretty.txt')], [`${pathToFile5}`, `${pathToFile6}`, getPrettyTestResult('pretty.txt')]])(
  'makeDiff using pretty output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter)).toBe(testResult);
  },
);

test.each([[`${pathToFile1}`, `${pathToFile2}`, getPlainTestResult('plain.txt')], [`${pathToFile3}`, `${pathToFile4}`, getPlainTestResult('plain.txt')], [`${pathToFile5}`, `${pathToFile6}`, getPlainTestResult('plain.txt')]])(
  'makeDiff using plain output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'plain')).toBe(testResult);
  },
);

test.each([[`${pathToFile1}`, `${pathToFile2}`, getJsonTestResult('json.json')], [`${pathToFile3}`, `${pathToFile4}`, getJsonTestResult('json.json')], [`${pathToFile5}`, `${pathToFile6}`, getJsonTestResult('json.json')]])(
  'makeDiff using json output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'json')).toBe(testResult);
  },
);
