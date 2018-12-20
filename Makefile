MAKEFLAGS += --no-print-directory --always-make

commit:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/commit.sh

lint:
	@set -e; pushd ../..; make lint DIR="src/hafuhafu"; popd

pull:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/pull.sh

push:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/push.sh

ship:
	@set -e; pushd ../..; make ship PATTERN="hafuhafu"; popd

test:
	@set -e; pushd ../..; make test JASMINE_CONFIG_PATH="src/hafuhafu/test/jasmine.js" PATTERN_NAME="HAFUHAFU"; popd

update:
	@set -e; pushd ../..; make update PATTERN="hafuhafu"; popd
