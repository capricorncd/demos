/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/08/03 20:02:51 (GMT+0900)
 */
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const getEnvData = (k) => {
  const env = {};
  const inputs = fs
    .readFileSync(path.resolve(__dirname, './.env.local'))
    .toString();
  inputs.split(/\n/).forEach((line) => {
    line = line.trim();
    if (!line.startsWith('#')) {
      const [key, value] = line.split('=');
      env[key] = value;
    }
  });
  return k ? env[k] : env;
};

let isTryAgain = true;

const main = () => {
  const env = getEnvData();
  const localPackagesDir = path.resolve(__dirname, '../packages');
  // 判断克隆存储目录packages是否存在
  if (!fs.existsSync(localPackagesDir)) {
    fs.mkdirSync(localPackagesDir);
  }

  const webPackagesDir = path.join(localPackagesDir, 'common-repository');
  // 本地目录为空，则克隆
  if (!fs.existsSync(webPackagesDir)) {
    // clone
    execSync(
      `git clone https://${env.GIT_USER}:${env.GIT_TOKEN}@gitlab.com/projects/common-repository --depth=1 ${webPackagesDir}`
    );
  }
  // 否则就拉取最新代码到本地
  // 拉取失败则删除本地文件，重新克隆
  else {
    try {
      // 进入本地目录，并拉取最新代码
      execSync(`cd ${webPackagesDir} && git pull`);
    } catch (err) {
      if (isTryAgain) {
        isTryAgain = false;
        // 删除本地旧代码
        execSync(`cd ${webPackagesDir} && rm -rf ${webPackagesDir}`);
        main();
      } else {
        throw err;
      }
    }
  }

  // 删除不需要的文件
  try {
    const packagesIncludes = ['a', 'b', '.c'];
    fs.readdirSync(webPackagesDir).forEach((item) => {
      if (!packagesIncludes.includes(item)) {
        execSync(
          `cd ${webPackagesDir} && rm -rf ${path.join(webPackagesDir, item)}`
        );
      }
    });
  } catch (err) {
    console.log('删除不需要的文件失败:', err.message);
  }
};

try {
  main();
} catch (err) {
  console.log('更新common-repository失败。');
  console.error(err);
}
