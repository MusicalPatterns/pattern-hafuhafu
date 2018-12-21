MAKEFLAGS += --no-print-directory --always-make

PATTERN=$(notdir $(shell pwd))

build:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/build.sh tsc package

commit:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/commit.sh

lint:
	@set -e; pushd ../..; make lint DIR="src/${PATTERN}"; popd

publish:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/publish.sh package

pull:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/pull.sh

push:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/push.sh

ship:
	@set -e; pushd ../..; make ship PATTERN=${PATTERN}; popd

test:
	@set -e; pushd ../..; make test JASMINE_CONFIG_PATH="src/${PATTERN}/test/jasmine.js" PATTERN=${PATTERN}; popd

update:
	@set -e; pushd ../..; make update PATTERN=${PATTERN}; popd
