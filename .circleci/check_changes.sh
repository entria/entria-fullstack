#!/usr/bin/env bash
# Check CIRCLE_COMPARE_URL first and if its not set, check for diff with master.

echo "CIRCLE_COMPARE_URL":
echo "$CIRCLE_COMPARE_URL"

if [[ ! -z "$CIRCLE_COMPARE_URL" ]]; then
    # CIRCLE_COMPARE_URL is not empty, use it to get the diff
    if [[ $CIRCLE_COMPARE_URL = *"commit"* ]]; then
        COMMIT_RANGE=$(echo $CIRCLE_COMPARE_URL | sed 's:^.*/commit/::g')~1
    else
        COMMIT_RANGE=$(echo $CIRCLE_COMPARE_URL | sed 's:^.*/compare/::g')
    fi
    echo "Diff: $COMMIT_RANGE"
    changes="$(git diff $COMMIT_RANGE --name-only)"
else
    # CIRCLE_COMPARE_URL is not set, diff with origin/master
    echo "Diff: origin/master..HEAD"
    changes="$(git diff-tree --no-commit-id --name-only -r origin/master..HEAD)"
fi

echo "Changes in this build:"
echo $changes
echo
