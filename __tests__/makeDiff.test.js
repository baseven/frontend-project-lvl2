import fs from 'fs';
import makeDiff from '../src';

const flatStrPath = `${__dirname}/__fixtures__/__flatStructure__/`;
const rectStrPath = `${__dirname}/__fixtures__/__recursiveStructure__/`;

const pathToFile1 = `${flatStrPath}__json__/before.json`;
const pathToFile2 = `${flatStrPath}__json__/after.json`;
const pathToFile3 = `${flatStrPath}__yml__/before.yml`;
const pathToFile4 = `${flatStrPath}__yml__/after.yml`;
const pathToFile5 = `${flatStrPath}__ini__/before.ini`;
const pathToFile6 = `${flatStrPath}__ini__/after.ini`;

const pathToFile7 = `${rectStrPath}__json__/before.json`;
const pathToFile8 = `${rectStrPath}__json__/after.json`;
const pathToFile9 = `${rectStrPath}__yml__/before.yml`;
const pathToFile10 = `${rectStrPath}__yml__/after.yml`;
const pathToFile11 = `${rectStrPath}__ini__/before.ini`;
const pathToFile12 = `${rectStrPath}__ini__/after.ini`;
/*
fs.writeFileSync(`${flatStrPath}__testResult__/json.json`,
 makeDiff(pathToFile1, pathToFile2, 'json'));
fs.writeFileSync(`${rectStrPath}__testResult__/json.json`,
 makeDiff(pathToFile7, pathToFile8, 'json'));
*/
const defaultFlatTestResult = fs.readFileSync(`${flatStrPath}__testResult__/default.txt`, 'utf8');
const plainFlatTestResult = fs.readFileSync(`${flatStrPath}__testResult__/plain.txt`, 'utf8');
const jsonFlatTestResult = fs.readFileSync(`${flatStrPath}__testResult__/json.json`, 'utf8');

const defaultRecTestResult = fs.readFileSync(`${rectStrPath}__testResult__/default.txt`, 'utf8');
const plainRecTestResult = fs.readFileSync(`${rectStrPath}__testResult__/plain.txt`, 'utf8');
const jsonRecTestResult = fs.readFileSync(`${rectStrPath}__testResult__/json.json`, 'utf8');

test.each([[`${pathToFile1}`, `${pathToFile2}`, defaultFlatTestResult], [`${pathToFile3}`, `${pathToFile4}`, defaultFlatTestResult], [`${pathToFile5}`, `${pathToFile6}`, defaultFlatTestResult]])(
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

test.each([[`${pathToFile1}`, `${pathToFile2}`, jsonFlatTestResult], [`${pathToFile3}`, `${pathToFile4}`, jsonFlatTestResult], [`${pathToFile5}`, `${pathToFile6}`, jsonFlatTestResult]])(
  'makeDiff using files with the flat data structure and json output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'json')).toBe(testResult);
  },
);

test.each([[`${pathToFile7}`, `${pathToFile8}`, defaultRecTestResult], [`${pathToFile9}`, `${pathToFile10}`, defaultRecTestResult], [`${pathToFile11}`, `${pathToFile12}`, defaultRecTestResult]])(
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

test.each([[`${pathToFile7}`, `${pathToFile8}`, jsonRecTestResult], [`${pathToFile9}`, `${pathToFile10}`, jsonRecTestResult], [`${pathToFile11}`, `${pathToFile12}`, jsonRecTestResult]])(
  'makeDiff using files with the recursive data structure and json output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'json')).toBe(testResult);
  },
);
