/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * Date: 2022/09/30 20:03:55 (GMT+0900)
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { mkdirSync, log, warn, error } = require('zx-sml/nodejs');

const handleTestResultsJSON = () => {
  // result json
  const testResultsDir = path.resolve(__dirname, '../test-results');
  if (!fs.existsSync(testResultsDir)) {
    warn(`test-results directory does not exist.`);
    return null;
  }
  const jsonFile = fs
    .readdirSync(testResultsDir)
    .filter((file) => /\.json$/.test(file))[0];
  if (!jsonFile) {
    warn(`${jsonFile} does not exist.`);
    return null;
  }

  // read json data from result dir
  const data = require(path.join(testResultsDir, jsonFile));

  const newDir = path.resolve(
    __dirname,
    `../__reports__/${+new Date()}`
  );

  mkdirSync(newDir);

  fs.writeFileSync(
    path.join(newDir, 'data.json'),
    JSON.stringify(data, null, 2),
    'utf8'
  );

  return newDir;
};

const moveReportDir = () => {
  log(`moveReportDir start =======`);

  const reportDir = path.resolve(__dirname, '../playwright-report');
  const indexHtmlFile = path.join(reportDir, 'index.html');

  if (!fs.existsSync(reportDir) || !fs.existsSync(indexHtmlFile)) {
    warn(`playwright-report does not exist.`);
    return null;
  }
  const newDir = handleTestResultsJSON();

  const spawnParams = ['-f', `${reportDir}/index.html`];
  if (fs.existsSync(`${reportDir}/data`)) {
    spawnParams.push(`${reportDir}/data`);
  }

  spawnParams.push(newDir);

  spawnSync('mv', spawnParams, {
    stdio: [process.stdin, process.stdout, process.stderr],
  });

  log(`moveReportDir ended =======`);
};

const main = () => {
  try {
    moveReportDir();
  } catch (err) {
    error(`moveReportDir error, ${err}`);
  }
};

main();
