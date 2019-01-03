SHELL := /bin/bash

MAKEFLAGS += --no-print-directory --always-make

LOCAL_PATTERN=$(notdir $(shell pwd))

build:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/build.sh tsc package

clean_updates:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/clean_updates.sh

commit:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/commit.sh

lint:
	@set -e; pushd ../..; make lint PATTERN=${LOCAL_PATTERN}; popd

publish:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/publish.sh package

pull:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/pull.sh

push:
	@set -e; ../../node_modules/@musical-patterns/cli/bin/push.sh

ship:
	@set -e; pushd ../..; make ship PATTERN=${LOCAL_PATTERN}; popd

snapshot:
	@set -e; pushd ../..; make snapshot PATTERN=${LOCAL_PATTERN}; popd

test:
	@set -e; pushd ../..; make test PATTERN=${LOCAL_PATTERN}; popd

update:
	@set -e; pushd ../..; make update PATTERN=${LOCAL_PATTERN}; popd
