commit:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/commit.sh

.PHONY: lint
lint:
	@set -e; pushd ../..; make lint DIR="src/hafuhafu"; popd

pull:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/pull.sh

push:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/push.sh

ship:
	@set -e; pushd ../..; make ship PATTERN="hafuhafu"; popd

.PHONY: test
test:
	@set -e; pushd ../..; make test JASMINE_CONFIG_PATH="src/hafuhafu/test/jasmine.js" PATTERN_NAME="HAFUHAFU"; popd

update:
	@set -e; pushd ../..; make update PATTERN="hafuhafu"; popd
