install:
	npm install

start:
	npx babel-node -- src/bin/exe.js

lint:
	npx eslint .

publish:
	npm publish	--dry-run