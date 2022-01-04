# version.surrealdb.com

This repository houses the code which powers the domain endpoint for displaying the latest published SurrealDB version at [version.surrealdb.com](https://version.surrealdb.com). The version displayed is always the latest release identifier for [SurrealDB](https://github.com/surrealdb/surrealdb), published using [Semantic Versioning](https://semver.org) format.

This version identifier is used in install scripts and for detecting whether an update for the database is available. SurrealDB can be installed and run with HomeBrew, Docker, or using any other container orchestration tool such as Docker Compose, Docker Swarm, Rancher, or in Kubernetes. Visit the [SurrealDB install page](https://surrealdb.com/install) for more information.