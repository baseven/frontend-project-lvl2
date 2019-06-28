install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js

test:
	npm test -- --coverage

watch:
	npm test --watch

lint:
	npx eslint .

publish:
	npm publish	--dry-run