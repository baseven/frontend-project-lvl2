install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js

test:
	npm test -- --coverage

lint:
	npx eslint .

publish:
	npm publish	--dry-run