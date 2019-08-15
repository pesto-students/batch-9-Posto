# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
slack or a zoom call.

## We Develop with Github
We use github to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests

## Report bugs using Github's [issues](https://github.com/pesto-students/batch-9-Posto/issues)

1. Create or pick any issue from the issues section on Github.
2. Pull latest code from `master` then create new branch.
3. Branch name convention: `username/issueType#issueNumber`  
Ex: `Navneet-Sahota/feat#25`
4. If you've added code that should be tested, add tests.
5. If you've changed APIs, update the documentation.
6. Ensure the test suite passes.
7. Commit your changes.
8. Commit message format: `issueType/Commit message or Issue Title` as title and tags like `close`, `fix` and `resolve` with `#issueNumber` in body to auto close that issue  
Ex: `chore/Setup eslint and husky`  
  `close #25`
9. Make sure your code lints (Never use --no-verify when there are linting errors).
10. Checkout master and pull latest code again.
11. Checkout on your branch and do `git rebase master`. Resolve merge conflicts, if any.
12. Push your branch to GitHub, create a PR on master and wait for CI to run tests.
13. If test fails, debug. Else, ask other contributors for review.
14. If your PR have UI updates then add a photo or a gif so reviewers can know what your code does.
15. If you have a ot of changes in your PR, then it is a good idea to make a small loom video explaining those changes.
14. Once reviewed, `rebase and merge` it. `squash and merge` in case it has more than 1 commit.
15. Delete your branch.
