# Release recovery

The npm release workflow intentionally publishes only after a pull request from
`changeset-release/main` is merged. If a version-packages pull request is
created from another branch, open a documentation-only recovery pull request
from the required branch so the already-versioned packages can be published by
the protected release workflow.
