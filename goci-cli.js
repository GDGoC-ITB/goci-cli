#!/usr/bin/env node

/**
 * GOCI - GDGoC ITB Command Line Interface
 * untuk submisi assignment
 * 
 * Penggunaan:
 * GOCI <email> <module_name> <filepath>
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import FormData from 'form-data';

// Set API URL from environment variable or default to localhost
const API_URL = 'http://localhost:3000/api';

async function main() {
  try {
    // Get command line arguments
    const args = process.argv.slice(2);
    
    // Handle help flag
    if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
      console.log(chalk.cyan(`
GOCI - GDGoC ITB Command Line Interface

Deskripsi:
  Tool untuk mengirimkan tugas/assignment ke platform LMS GDGoC ITB

Penggunaan:
  GOCI <email> <module_name> <filepath>

Parameter:
  <email>        Email yang terdaftar di platform LMS
  <module_name>  Nama module (harus sama persis dengan di platform)
  <filepath>     Path ke file yang akan disubmit

Contoh:
  GOCI student@itb.ac.id "JavaScript Basics" ./assignment.js
      `));
      process.exit(0);
    }
    
    if (args.length !== 3) {
      console.log(chalk.red('Error: Invalid number of arguments'));
      console.log(chalk.yellow('Usage: GOCI <email> <module_name> <filepath>'));
      process.exit(1);
    }
    
    const [email, moduleName, filePath] = args;
    
    // Validate email
    if (!isValidEmail(email)) {
      console.log(chalk.red('Error: Invalid email format'));
      process.exit(1);
    }
    
    // Validate file path
    if (!fs.existsSync(filePath)) {
      console.log(chalk.red(`Error: File '${filePath}' does not exist`));
      process.exit(1);
    }
    
    // Extract original filename and extension
    const originalFilename = path.basename(filePath);
    const fileExtension = path.extname(filePath).slice(1); // Get extension without dot
    
    // Make a formatted filename for submission
    // Format: original_extension__originalfilename.txt
    // Example: js__mycode.txt
    const formattedFilename = `${fileExtension}__${originalFilename}`;
    
    const spinner = ora(chalk.cyan(`Submitting assignment for module "${moduleName}"...`)).start();
    console.log(chalk.cyan(`\nSubmitting file: ${formattedFilename}`));
    console.log(chalk.cyan(`Original filename: ${fileExtension}`));

    // Make a FormData object to send the file
    const formData = new FormData();
    formData.append('email', email);
    formData.append('moduleName', moduleName);
    formData.append('file', fs.createReadStream(filePath), formattedFilename);
    formData.append('originalExtension', fileExtension); // Kirim extension asli sebagai field terpisah
    
    // Kirim data ke server
    const response = await fetch(`${API_URL}/submissions/cli-submit-with-file`, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders ? formData.getHeaders() : {} // node-fetch versi baru mungkin tidak memerlukan ini
    });
    
    const result = await response.json();
    
    if (response.ok) {
      spinner.succeed(chalk.green('Assignment submitted successfully!'));
      console.log(chalk.cyan(`\nDetails:`));
      console.log(chalk.cyan(`• Email: ${email}`));
      console.log(chalk.cyan(`• Module: ${moduleName}`));
      console.log(chalk.cyan(`• File: ${originalFilename}`));
      console.log(chalk.cyan(`• Submitted at: ${new Date().toLocaleString()}`));
      
      console.log(chalk.yellow(`\n${result.data ? result.data.message : 'Submission recorded successfully.'}`));
    } else {
      spinner.fail(chalk.red('Submission failed!'));
      console.error(chalk.red(`\n${result.message || 'Unknown error occurred'}`));
      process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red(`\nError: ${error.message}`));
    if (error.stack) {
      console.error(chalk.gray(error.stack));
    }
    process.exit(1);
  }
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

main();