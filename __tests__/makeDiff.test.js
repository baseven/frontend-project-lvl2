import makeDiff from '../src';

const pathToFile1 = '__tests__/__fixtures__/before.json';
const pathToFile2 = '__tests__/__fixtures__/after.json';
// const pathToResult = '__tests__/__fixtures__/jsonTestResult.txt';

const result = '{\n\t  host: hexlet.io\n\t+ timeout: 20\n\t- timeout: 50\n\t- proxy: 123.234.53.22\n\t- follow: false\n\t+ verbose: true\n}';

test('makeDiff using json', () => {
  expect(makeDiff(pathToFile1, pathToFile2)).toBe(result);
});
