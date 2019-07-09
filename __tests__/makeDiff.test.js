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

const getComplexFlatResult = file => fs.readFileSync(`${flatStrPath}__testResult__/${file}`, 'utf8');
const getPlainFlatResult = file => fs.readFileSync(`${flatStrPath}__testResult__/${file}`, 'utf8');
const getJsonFlatResult = file => fs.readFileSync(`${flatStrPath}__testResult__/${file}`, 'utf8');

const getComplexRecResult = file => fs.readFileSync(`${rectStrPath}__testResult__/${file}`, 'utf8');
const getPlainRecResult = file => fs.readFileSync(`${rectStrPath}__testResult__/${file}`, 'utf8');
const getJsonRecResult = file => fs.readFileSync(`${rectStrPath}__testResult__/${file}`, 'utf8');

test.each([[`${pathToFile1}`, `${pathToFile2}`, getComplexFlatResult('complex.txt')], [`${pathToFile3}`, `${pathToFile4}`, getComplexFlatResult('complex.txt')], [`${pathToFile5}`, `${pathToFile6}`, getComplexFlatResult('complex.txt')]])(
  'makeDiff using files with the flat data structure and complex output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter)).toBe(testResult);
  },
);

test.each([[`${pathToFile1}`, `${pathToFile2}`, getPlainFlatResult('plain.txt')], [`${pathToFile3}`, `${pathToFile4}`, getPlainFlatResult('plain.txt')], [`${pathToFile5}`, `${pathToFile6}`, getPlainFlatResult('plain.txt')]])(
  'makeDiff using files with the flat data structure and plain output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'plain')).toBe(testResult);
  },
);

test.each([[`${pathToFile1}`, `${pathToFile2}`, getJsonFlatResult('json.json')], [`${pathToFile3}`, `${pathToFile4}`, getJsonFlatResult('json.json')], [`${pathToFile5}`, `${pathToFile6}`, getJsonFlatResult('json.json')]])(
  'makeDiff using files with the flat data structure and json output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'json')).toBe(testResult);
  },
);

test.each([[`${pathToFile7}`, `${pathToFile8}`, getComplexRecResult('complex.txt')], [`${pathToFile9}`, `${pathToFile10}`, getComplexRecResult('complex.txt')], [`${pathToFile11}`, `${pathToFile12}`, getComplexRecResult('complex.txt')]])(
  'makeDiff using files with the recursive data structure and complex output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter)).toBe(testResult);
  },
);

test.each([[`${pathToFile7}`, `${pathToFile8}`, getPlainRecResult('plain.txt')], [`${pathToFile9}`, `${pathToFile10}`, getPlainRecResult('plain.txt')], [`${pathToFile11}`, `${pathToFile12}`, getPlainRecResult('plain.txt')]])(
  'makeDiff using files with the recursive data structure and plain output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'plain')).toBe(testResult);
  },
);

test.each([[`${pathToFile7}`, `${pathToFile8}`, getJsonRecResult('json.json')], [`${pathToFile9}`, `${pathToFile10}`, getJsonRecResult('json.json')], [`${pathToFile11}`, `${pathToFile12}`, getJsonRecResult('json.json')]])(
  'makeDiff using files with the recursive data structure and json output format',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter, 'json')).toBe(testResult);
  },
);
