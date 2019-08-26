[![Maintainability](https://api.codeclimate.com/v1/badges/fa53fc87039982487d68/maintainability)](https://codeclimate.com/github/baseven/frontend-project-lvl2/maintainability)
[![Build Status](https://travis-ci.org/baseven/frontend-project-lvl2.svg?branch=master)](https://travis-ci.org/baseven/frontend-project-lvl2)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fa53fc87039982487d68/test_coverage)](https://codeclimate.com/github/baseven/frontend-project-lvl2/test_coverage)

## Description
The command line utility compares two configuration files and shows a difference.
The utility supports the following input data formats: json, yaml, ini.
The output report can be generated in one of the following formats: pretty (default), plain, json.

## Download

```$ git clone https://github.com/baseven/frontend-project-lvl2.git```

## Instalation

Navigate to the project directory and follow the steps below:

1. Install dependencies:

```
$ make install
```
2. Publish the package locally:

```
$ make publish
```
3. Install the package from local storage:

```
$ npm link
```
## Usage
```
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  Output format (default: "pretty")
  -h, --help           output usage information
```

## Examples

### Compare json files and show the difference in the pretty output format
[![asciicast](https://asciinema.org/a/t9E3s5Bv3wmIvB2ximv3WeINm.svg)](https://asciinema.org/a/t9E3s5Bv3wmIvB2ximv3WeINm)
### Compare yaml files and show the difference in the plain output format
[![asciicast](https://asciinema.org/a/0KtRtNSvuYBYme0k5Xwgksnnp.svg)](https://asciinema.org/a/0KtRtNSvuYBYme0k5Xwgksnnp)
### Compare ini files and show the difference in the json output format
[![asciicast](https://asciinema.org/a/c9jfc2Sjyx8Lo3IUSWQfODm1S.svg)](https://asciinema.org/a/c9jfc2Sjyx8Lo3IUSWQfODm1S)