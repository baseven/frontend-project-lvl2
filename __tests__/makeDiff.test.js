// import fs from 'fs';
// import path from 'path';
import makeDiff from '../src';

const pathToFile1 = `${__dirname}/__fixtures__/__json__/before.json`;
const pathToFile2 = `${__dirname}/__fixtures__/__json__/after.json`;

const pathToFile3 = `${__dirname}/__fixtures__/__yml__/before.yml`;
const pathToFile4 = `${__dirname}/__fixtures__/__yml__/after.yml`;

const pathToFile5 = `${__dirname}/__fixtures__/__ini__/before.ini`;
const pathToFile6 = `${__dirname}/__fixtures__/__ini__/after.ini`;

// const pathToResult = '__tests__/__fixtures__/jsonTestResult.txt';

const result = '{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t- follow: false\n\t+ verbose: true\n}';

test.each([[`${pathToFile1}`, `${pathToFile2}`, result], [`${pathToFile3}`, `${pathToFile4}`, result], [`${pathToFile5}`, `${pathToFile6}`, result]])(
  'makeDiff',
  (pathToFileBefore, pathToFileAfter, testResult) => {
    expect(makeDiff(pathToFileBefore, pathToFileAfter)).toBe(testResult);
  },
);
/*
test('makeDiff using json', () => {
  expect(makeDiff(pathToFile1, pathToFile2)).toBe(result);
});

test('makeDiff using yml', () => {
  expect(makeDiff(pathToFile3, pathToFile4)).toBe(result);
});

test('makeDiff using ini', () => {
  expect(makeDiff(pathToFile5, pathToFile6)).toBe(result);
});
*/
