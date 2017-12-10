const {publishTask, commands} = require('@ayro/commons');
const path = require('path');
const Promise = require('bluebird');

const WORKING_DIR = path.resolve(__dirname, '../');

function buildProject() {
  return Promise.coroutine(function* () {
    commands.log('Linting project...');
    yield commands.exec('npm run lint');
    commands.log('Building project...');
    yield commands.exec('npm run build-prod');
  })();
}

// Run this if call directly from command line
if (require.main === module) {
  publishTask.withWorkingDir(WORKING_DIR);
  publishTask.withBuildTask(buildProject);
  publishTask.isDockerProject(true);
  publishTask.run();
}
