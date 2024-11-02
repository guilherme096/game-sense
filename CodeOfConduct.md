# Code of Conduct for GameSense Project

## Introduction
This document outlines the Code of Conduct for the **GameSense** project as part of the Introduction to Software Engineering (IES) discipline. It establishes principles and practices to foster a respectful, collaborative, and productive environment. Adherence to these guidelines is expected from all team members.

---

## Table of Contents
- [Code of Conduct for GameSense Project](#code-of-conduct-for-gamesense-project)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Version Control](#version-control)
    - [Branching Strategy](#branching-strategy)
    - [Gitflow Commands](#gitflow-commands)
      - [Creating a New Feature Branch](#creating-a-new-feature-branch)
      - [Creating a Release Branch](#creating-a-release-branch)
      - [Creating a Hotfix Branch](#creating-a-hotfix-branch)
      - [Pull Requests in VSCode and IntelliJ](#pull-requests-in-vscode-and-intellij)
  - [Naming Conventions](#naming-conventions)
    - [Branch Names](#branch-names)
    - [Commit Messages](#commit-messages)
  - [Code Review](#code-review)
    - [Review Process](#review-process)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Documentation](#documentation)
  - [Communication](#communication)
  - [Conflict Resolution](#conflict-resolution)
  - [Enforcement](#enforcement)
  - [Amendments](#amendments)

---

## Version Control

### Branching Strategy
- **Main Branch**: The `main` branch is the source of truth. All production-ready code resides here.
- **Development Branch**: The `dev` branch is where all development merges before being promoted to `main`.
- **Release Branches**: Release branches are created from `dev` for each new version of the software. Once the release is stable, it is merged into `main` and `dev`.
- **Feature Branches**: Each new feature should be developed in a separate branch, branching off from `dev`.
- **Hotfix Branches**: Urgent fixes for the production codebase are made in hotfix branches, which are merged directly into `main` and then back-merged into `dev`.

![alt text](https://miro.medium.com/v2/resize:fit:1400/1*9yJY7fyscWFUVRqnx0BM6A.png)

### Gitflow Commands

Here are the basic commands to follow Gitflow branching strategy:

#### Creating a New Feature Branch
1. Start from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   ```
2. Create and switch to a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   - if you want to change the branch name, you can use the following command:
   ```bash
    git branch -m feature/your-feature-name
    ```
3. Commit changes as you work:
   ```bash
   git add .
   git commit -m "Add feature description"
   ```
4. Push the branch to the remote repository:
   ```bash
   git push origin feature/your-feature-name
   ```

#### Creating a Release Branch
1. Start from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   ```
2. Create a release branch:
   ```bash
   git checkout -b release/version-number
   ```

#### Creating a Hotfix Branch
1. Start from `main`:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Create a hotfix branch:
   ```bash
   git checkout -b hotfix/description-of-fix
   ```

After resolving the hotfix:
- Merge it into `main` and `dev`:
   ```bash
   git checkout main
   git merge hotfix/description-of-fix
   git checkout dev
   git merge hotfix/description-of-fix
   ```

#### Pull Requests in VSCode and IntelliJ

**Git Pull Requests Extension in VSCode**:
1. Install the **GitHub Pull Requests and Issues** extension from the VSCode marketplace.
2. Open the **Source Control** sidebar and connect your GitHub account.
3. Once your feature or hotfix branch is ready, push your changes to GitHub.
4. Click on **Create Pull Request** directly in VSCode. The extension will guide you through selecting the base branch (usually `dev`) and filling out the PR details.
5. Team members can review the pull request, leave comments, and approve it within VSCode.

**Pull Requests in IntelliJ**:
1. IntelliJ supports pull requests through the built-in GitHub integration.
2. Open the **Git** menu, select **GitHub** -> **Open Pull Requests**, and connect your GitHub account if needed.
3. After pushing your branch to GitHub, use **Git | GitHub | Create Pull Request** to select the base branch, add a title, and fill in details for your pull request.
4. Team members can review, comment, and approve the pull request directly from IntelliJ’s GitHub tool window.

---

## Naming Conventions

### Branch Names
- Use descriptive names for branches, prefixed with the type, separated by slashes (e.g., `feature/user-auth`, `hotfix/api-bug`).

### Commit Messages
- Use imperative mood to describe what the commit does (e.g., "Implement user authentication module").
- Include ticket or issue numbers if applicable.
- Keep messages concise and relevant.

---

## Code Review

### Review Process
- Assign at least one reviewer for each pull request.
- Reviewers should provide constructive feedback, ensuring that changes meet project standards and requirements.

---

## Acceptance Criteria
- Code meets the GameSense project’s coding standards and guidelines.
- Documentation is updated to reflect changes.
- Changes are thoroughly tested (where applicable) and do not introduce new bugs.

---


## Documentation
- Document all features, functions, and algorithms.
- Use clear, concise language, including examples where possible.

---

## Communication
- Maintain regular communication with team members, especially when working remotely.
- Use designated channels for project discussions, updates, and questions.

---

## Conflict Resolution
- Address conflicts directly with the involved parties.
- Escalate unresolved issues to the team lead or project manager.

---

## Enforcement
Violations of this Code of Conduct may result in warnings, removal from the project, or further disciplinary actions as deemed appropriate by the leadership team.

---

## Amendments
This Code of Conduct is a living document and may be updated as the project evolves. All team members will be notified of any changes.
