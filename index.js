const { exec } = require('child_process');
const { log } = require('console');

async function sortHackerNewsArticles() {
  const { default: chalk }  = await import('chalk');

  exec('npm run test @hackerNews', (error, stdout, stderr) => {
    if (error) {
      log(chalk.red(`Playwright test errors:\n${stderr}`));
    } else{ 
      log(chalk.bold.bgYellow(`***************************************************`))
      log(chalk.bold.bgYellow(`************ Playwright test completed ************`))
      log(chalk.bold.bgYellow(`***************************************************`))
      log(stdout)
    }
  });
}

(async () => {
  await sortHackerNewsArticles();
})();
