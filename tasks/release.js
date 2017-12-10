const {releaseTask, commands} = require('@ayro/commons');
const path = require('path');
const Promise = require('bluebird');

const WORKING_DIR = path.resolve(__dirname, '../');

function buildProject() {
  return Promise.coroutine(function* () {
    commands.log('Linting project...');
    yield commands.exec('npm run lint', WORKING_DIR);
    commands.log('Building project...');
    yield commands.exec('npm run build-prod', WORKING_DIR);
  })();
}

// Run this if call directly from command line
if (require.main === module) {
  releaseTask.withWorkingDir(WORKING_DIR);
  releaseTask.withBuildTask(buildProject);
  releaseTask.run(process.argv[2], process.argv[3]);
}
