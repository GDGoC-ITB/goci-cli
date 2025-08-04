#!/usr/bin/env node

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import FormData from 'form-data';
import http from 'http';
import open from 'open';
import os from 'os';
import updateNotifier from 'update-notifier';
import pkg from './package.json' with { type: 'json' };

const API_URL = 'https://api.gdgocitb.com/api';
const FRONTEND_URL = 'https://gdgocitb.com';

const CONFIG_DIR = path.join(os.homedir(), '.config', 'goci');
const TOKEN_PATH = path.join(CONFIG_DIR, 'token.jwt');

async function main() {
  updateNotifier({ pkg }).notify();
  
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'login':
        await handleLogin();
        break;
      case 'logout':
        handleLogout();
        break;
      case 'submit':
        await handleSubmit(args.slice(1));
        break;
      case '--version':
      case '-v':
        console.log(chalk.cyan('GOCI - GDGoC ITB Command Line Interface v2.0.1'));
        break;
      case '--help':
      case '-h':
      default:
        printHelp();
        break;
    }
  } catch (error) {
    console.error(chalk.red(`\nError: ${error.message}`));
    process.exit(1);
  }
}

// Print Help Function
function printHelp() {
  console.log(chalk.cyan(`
GOCI - GDGoC ITB Command Line Interface

Perintah:
  login                   Mulai proses login via browser untuk otentikasi CLI.
  logout                  Hapus token otentikasi dari komputer Anda.
  submit <module> <path>  Kirim file tugas untuk modul tertentu.
  --version, -v           Tampilkan versi GOCI.
  --help, -h              Tampilkan pesan bantuan ini.

Contoh Penggunaan:
  goci login
  goci submit "JavaScript Basics" ./assignment.js
  goci logout
  `));
}

// LOGOUT
function handleLogout() {
  if (fs.existsSync(TOKEN_PATH)) {
    fs.unlinkSync(TOKEN_PATH);
    console.log(chalk.green('✅ You have been logged out successfully.'));
  } else {
    console.log(chalk.yellow('You are not logged in.'));
  }
}

// LOGIN
function handleLogin() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(TOKEN_PATH)) {
      console.log(chalk.yellow('You are already logged in.'));
      console.log(chalk.cyan('To log in with a different account, please run "goci logout" first.'));
      return;
    }
    const spinner = ora('Waiting for browser authentication...').start();
    
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://${req.headers.host}`);
      
      if (url.pathname === '/callback') {
        const token = url.searchParams.get('token');

        if (token) {
          if (!fs.existsSync(CONFIG_DIR)) fs.mkdirSync(CONFIG_DIR, { recursive: true });
          fs.writeFileSync(TOKEN_PATH, token, 'utf-8');
          
          spinner.succeed(chalk.green('Authentication successful! You can now use the "submit" command.'));
          res.end('<html><head><style>body{font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;}</style></head><body><h1>Authentication successful! You can close this tab and return to your terminal.</h1></body></html>');
          server.close(resolve);
        } else {
          const errorMsg = 'Authentication failed. No token received on callback.';
          spinner.fail(chalk.red(errorMsg));
          res.end(`<h1>Authentication Failed.</h1><p>${errorMsg}</p>`);
          server.close(() => reject(new Error(errorMsg)));
        }
      } else {
        res.writeHead(204);
        res.end();
      }

    }).listen(0, () => {
      const port = server.address().port;
      const authUrl = `${FRONTEND_URL}/cli-auth?port=${port}`;
      spinner.text = `Please complete the login process in your browser. If it doesn't open automatically, please visit:\n${chalk.cyan(authUrl)}`;
      open(authUrl);
    });
  });
}

// SUBMIT
async function handleSubmit(args) {
  if (args.length !== 2) {
    console.log(chalk.red('Error: Invalid arguments for submit command.'));
    printHelp();
    return;
  }

  if (!fs.existsSync(TOKEN_PATH)) {
    console.log(chalk.red('Error: You are not logged in. Please run "goci login" first.'));
    return;
  }
  const token = fs.readFileSync(TOKEN_PATH, 'utf-8');
  
  const [moduleName, filePath] = args;

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red(`Error: File '${filePath}' does not exist.`));
    return;
  }

  const spinner = ora(chalk.cyan(`Submitting assignment for module "${moduleName}"...`)).start();

  const originalFilename = path.basename(filePath);
  const fileExtension = path.extname(filePath).slice(1) || 'txt';
  const formattedFilename = `${fileExtension}__${originalFilename}`;

  const formData = new FormData();
  formData.append('moduleName', moduleName);
  formData.append('file', fs.createReadStream(filePath), formattedFilename);
  formData.append('originalExtension', fileExtension);

  const response = await fetch(`${API_URL}/submissions/cli-submit-with-file`, {
    method: 'POST',
    body: formData,
    headers: {
      ...formData.getHeaders(),
      'Authorization': `Bearer ${token}`
    }
  });

  const result = await response.json();

  if (response.ok) {
    spinner.succeed(chalk.green('Assignment submitted successfully!'));
    console.log(chalk.yellow(`\n${result.data ? result.data.message : 'Submission recorded.'}`));
  } else {
    spinner.fail(chalk.red('Submission failed!'));
    console.error(chalk.red(`\n${result.message || 'Unknown error occurred'}`));
  }
}

main();