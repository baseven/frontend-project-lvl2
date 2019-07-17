import fs from 'fs';
import makeDiff from '../src';

const path = `${__dirname}/__fixtures__/`;

const arrayOfExtensions = ['json', 'yml', 'ini'];
const arrayOfFormats = ['pretty', 'plain', 'json'];

const getPathToFile = (extension, name) => `${path}__${extension}__/${name}.${extension}`;

const getTestResult = filename => fs.readFileSync(`${path}__testResult__/${filename}`, 'utf8');

const getTestParameters = (extension, filename) => [getPathToFile(extension, 'before'), getPathToFile(extension, 'after'), getTestResult(filename)];

const getTestTable = (extensions, filename) => extensions.map(v => getTestParameters(v, filename));

const makeTest = (extensions, format) => {
  const filename = format === 'json' ? 'json.json' : `${format}.txt`;

  test.each(getTestTable(extensions, filename))(
    `makeDiff using ${format} output format`,
    (pathToFileBefore, pathToFileAfter, testResult) => {
      expect(makeDiff(pathToFileBefore, pathToFileAfter, format)).toBe(testResult);
    },
  );
};

const makeTestSuites = (extensions, formats) => formats.map(format => makeTest(extensions, format));

makeTestSuites(arrayOfExtensions, arrayOfFormats);
