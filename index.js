const core = require('@actions/core');
const github = require('@actions/github');

const DEFAULT_BRANCHES = ['master', 'main'];
const REF_REGEX = /refs\/(.+)\/(.+)/; // e.g. 'refs/heads/main' or 'refs/tags/123'

try {

  const ref = github.context.ref;
  const commitMsg = github.event.head_commit.message;
  console.log(`Reference is ${ref}, commit message is ${commitMsg}`);

  const [, refType, branch] = ref.match(REF_REGEX);
  const isDefaultBranch = DEFAULT_BRANCHES.includes(branch);
  const isTag = ref.startsWith('refs/tags');
  console.log(`Branch is ${branch}, refType is ${refType}. isTag=${isTag}, isDefaultBranch=${isDefaultBranch}`);

  const deployToACR = core.getInput('deploy-to-acr') === 'true';
  const deployToGPR = core.getInput('deploy-to-gpr') === 'true';
  console.log(`Deploy to ACR: ${deployToACR}, deploy to GPR: ${deployToGPR}`)

  let goals;
  if (isDefaultBranch) {
    goals = 'clean verify';
  } else if (deployToACR && deployToGPR) {
    goals = 'clean deploy jib:build';
  } else if (deployToACR) {
    goals = 'clean verify jib:build';
  } else if (deployToGPR) {
    goals = 'clean deploy';
  } else {
    console.log('Not on default branch and no specified deploy methods - make sure this is as intended');
    goals = 'clean verify';
  }

  if (isTag || (!isDefaultBranch && commitMsg.startsWith('[skip tests]'))) {
    goals = "-Dmaven.test.skip.exec " + goals;
  }

  console.log(`Exporting goals: ${goals}`);
  core.exportVariable('MVN_GOALS', goals);
  core.setOutput('maven-goals', goals);

} catch (error) {
  core.setFailed(error.message);
}
