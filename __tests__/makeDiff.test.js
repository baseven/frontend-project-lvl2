// import fs from 'fs';
import makeDiff from '../src';

const pathToFile1 = `${__dirname}/__fixtures__/__json__/before.json`;
const pathToFile2 = `${__dirname}/__fixtures__/__json__/after.json`;
const pathToFile3 = `${__dirname}/__fixtures__/__yml__/before.yml`;
const pathToFile4 = `${__dirname}/__fixtures__/__yml__/after.yml`;

// const pathToResult = '__tests__/__fixtures__/jsonTestResult.txt';

const result = '{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t- follow: false\n\t+ verbose: true\n}';

test('makeDiff using json', () => {
  expect(makeDiff(`${pathToFile1}`, pathToFile2)).toBe(result);
});

test('makeDiff using yml', () => {
  expect(makeDiff(pathToFile3, pathToFile4)).toBe(result);
});
