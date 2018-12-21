MAKEFLAGS += --no-print-directory --always-make

PATTERN=$(notdir $(shell pwd))

build:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/build.sh tsc package

commit:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/commit.sh

lint:
	@set -e; pushd ../..; make lint PATTERN=${PATTERN}; popd

publish:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/publish.sh package

pull:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/pull.sh

push:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/push.sh

share_config:
	@set -e; pushd ../..; make share_config PATTERN=${PATTERN}; popd

ship:
	@set -e; pushd ../..; make ship PATTERN=${PATTERN}; popd

snapshot:
	@set -e; pushd ../..; make snapshot PATTERN=${PATTERN}; popd

test:
	@set -e; pushd ../..; make test PATTERN=${PATTERN}; popd

update:
	@set -e; pushd ../..; make update PATTERN=${PATTERN}; popd
