const {releaseTask, commands} = require('@ayro/commons');
const path = require('path');

const WORKING_DIR = path.resolve(__dirname, '../');

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
  releaseTask.withWorkingDir(WORKING_DIR);
  releaseTask.withLintTask(lintProject);
  releaseTask.withBuildTask(buildProject);
  releaseTask.run(process.argv[2], process.argv[3]);
}
