pull:
	../../node_modules/@musical-patterns/cli/bin/pull.sh

.PHONY: test
test:
	pushd ../..; JASMINE_CONFIG_PATH="src/hafuhafu/test/jasmine.js" PATTERN_NAME="HAFUHAFU" make test; popd

.PHONY: lint
lint:
	pushd ../..; DIR="src/hafuhafu" make lint; popd
