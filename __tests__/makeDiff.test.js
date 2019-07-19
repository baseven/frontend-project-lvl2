import fs from 'fs';
import makeDiff from '../src';

const path = `${__dirname}/__fixtures__/`;

const inputExtensions = ['json', 'yml', 'ini'];
const outputFormats = [
  {
    formatName: 'pretty',
    formatExtension: 'txt',
  },
  {
    formatName: 'plain',
    formatExtension: 'txt',
  },
  {
    formatName: 'json',
    formatExtension: 'json',
  },
];

const getPathToFile = (fileName, fileExtension) => `${path}__${fileExtension}__/${fileName}.${fileExtension}`;

const getTestResult = (formatName, formatExtension) => fs.readFileSync(`${path}__testResult__/${formatName}.${formatExtension}`, 'utf8');

const getTestParameters = (fileExtension, formatName, formatExtension) => [
  getPathToFile('before', fileExtension),
  getPathToFile('after', fileExtension),
  getTestResult(formatName, formatExtension),
];

const getTestTable = (fileExtensions, formatName, formatExtension) => fileExtensions.map(
  fileExtension => getTestParameters(fileExtension, formatName, formatExtension),
);

const makeTest = (fileExtensions, formatName, formatExtension) => {
  test.each(getTestTable(fileExtensions, formatName, formatExtension))(
    `makeDiff using ${formatName} output format`,
    (pathToFileBefore, pathToFileAfter, testResult) => {
      expect(makeDiff(pathToFileBefore, pathToFileAfter, formatName)).toBe(testResult);
    },
  );
};

const makeTestSuites = (extensions, formats) => formats.map(
  ({ formatName, formatExtension }) => makeTest(extensions, formatName, formatExtension),
);

makeTestSuites(inputExtensions, outputFormats);
