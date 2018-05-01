'use strict';

const {publishTask, commands} = require('@ayro/commons');
const path = require('path');

const WORKING_DIR = path.resolve(__dirname, '../');

async function buildProject() {
  commands.log('Linting project...');
  await commands.exec('npm run lint');
  commands.log('Building project...');
  await commands.exec('npm run build-prod');
}

// Run this if call directly from command line
if (require.main === module) {
  publishTask.withWorkingDir(WORKING_DIR);
  publishTask.withBuildTask(buildProject);
  publishTask.isDockerProject(true);
  publishTask.run();
}
