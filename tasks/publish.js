'use strict';

const path = require('../utils/path');
const {publishTask, commands} = require('@ayro/commons');

const WORKING_DIR = path.root();

async function lintProject() {
  commands.log('Linting project...');
  await commands.exec('npm run lint', WORKING_DIR);
}

async function buildProject() {
  commands.log('Building project...');
  await commands.exec('npm run build-prod', WORKING_DIR);
}

// Run this if call directly from command line
if (require.main === module) {
  publishTask.withWorkingDir(WORKING_DIR);
  publishTask.withLintTask(lintProject);
  publishTask.withBuildTask(buildProject);
  publishTask.isDockerProject(true);
  publishTask.run();
}
