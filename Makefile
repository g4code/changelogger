MOCHA_PATH = ./node_modules/.bin/mocha

install:
	@npm install

test:
	@NODE_ENV=test $(MOCHA_PATH) \
		--recursive \
		--reporter dot
		
test-spec:
	@NODE_ENV=test $(MOCHA_PATH) \
		--recursive \
		--reporter spec

test-w:
	@NODE_ENV=test $(MOCHA_PATH) \
		--recursive \
		--reporter dot \
		--growl \
		--watch

.PHONY: install
.PHONY: test test-spec test-w
