const express = require('express');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs').promises;

const app = express();

const baseFolder = path.join(process.cwd(), './packages/base/dist');
const packageFolder = path.join(process.cwd(), './packages');
const indexHtml = path.join(process.cwd(), './packages/base/dist/index.html');

app.use(async (req, res) => {
  console.log(chalk.yellow('Received request:', req.url));

  const url = req.url === '/' ? 'index.html' : req.url;

  if (url.startsWith('/cdn/')) {
    return serveFile(res, path.join(packageFolder, url.replace(/^\/cdn/, '')));
  }

  serveFile(res, path.join(baseFolder, url), indexHtml);
});

app.listen(4000, () =>
  console.log('Server started listening at http://localhost:4000')
);

async function serveFile(res, file, fallback) {
  try {
    console.log(chalk.blue('Trying '), file);
    const stat = await fs.stat(file);
    if (stat.isFile()) {
      console.log(chalk.green('Serving '), file);
      return res.sendFile(file);
    }
  } catch (error) {
    if (fallback) {
      console.log(chalk.red('404 Fallback'), 'Serving `index.html`');
      return res.sendFile(fallback);
    } else {
      console.log(chalk.red.bold('404 Not Found'));
      res.sendStatus(404);
    }
  }
}
