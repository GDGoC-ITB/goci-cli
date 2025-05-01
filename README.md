# GOCI - GDGoC ITB Command Line Interface

A command-line interface tool for submitting assignments to the GDGoC ITB Learning Management System.

## Description

GOCI (GDGoC ITB CLI) is a command-line tool developed to simplify the submission process for GDGoC ITB members and buddies. This tool is specifically designed for assignments that require quick code or file submissions.

## Prerequisites

Before installing GOCI, make sure you have Node.js and npm installed on your system.

### Installing Node.js and npm

1. **For Windows/macOS users**:
   - Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)
   - Choose the LTS (Long Term Support) version for better stability
   - npm will be installed automatically with Node.js

2. **For Linux users**:
   ```bash
   # Using Ubuntu/Debian
   sudo apt update
   sudo apt install nodejs npm

   # Using CentOS/RHEL
   sudo yum install nodejs npm
   ```

3. **Verify installation**:
   ```bash
   node --version
   npm --version
   ```

## Installation

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gdgoc-itb/goci-cli.git
   cd goci-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link the package globally:
   ```bash
   npm link
   ```

### Installation from NPM (if published)

```bash
npm install -g goci-cli
```

## Usage

The basic syntax for GOCI is:

```bash
GOCI <email> <module_name> <file_path>
```

Example:

```bash
GOCI john.doe@itb.ac.id "Introduction to JavaScript" ./assignment1.js
```

### Parameters

- `<email>`: Email registered in the GDGoC ITB LMS platform
- `<module_name>`: Module name that matches exactly with the one on the platform
- `<file_path>`: Path to the file you want to submit

## Usage Examples

1. Submitting a JavaScript file for "JavaScript Basics" module:

   ```bash
   GOCI student@itb.ac.id "JavaScript Basics" ./hello-world.js
   ```

2. Submitting a Python program for "Python Introduction" module:

   ```bash
   GOCI student@itb.ac.id "Python Introduction" ./my_app.py
   ```

## Troubleshooting

If you encounter issues, please make sure:

1. The email you're using is registered in the GDGoC ITB LMS system
2. The module name is typed correctly and exactly matches the one on the platform (case-sensitive)
3. The file you want to submit exists and is accessible
4. You are connected to the internet

## Environment Variables

GOCI uses environment variables that can be configured:

- `API_URL`: URL of the GDGoC ITB LMS API (default: `http://localhost:5000/api-GDGoC-ITB`)

To set environment variables:

```bash
# For Linux/macOS
export API_URL=https://api.lms.gdgoc-itb.com/api-GDGoC-ITB

# For Windows (Command Prompt)
set API_URL=https://api.lms.gdgoc-itb.com/api-GDGoC-ITB

# For Windows (PowerShell)
$env:API_URL = "https://api.lms.gdgoc-itb.com/api-GDGoC-ITB"
```

## FAQ

### How do I check if my submission was successful?

If your submission is successful, GOCI will display a success message. You can also check your submission status on the GDGoC ITB LMS dashboard.

### Do I need to log in first?

No. GOCI identifies users based on the provided email. Make sure your email is registered in the system.

### What if I forget the module name?

You can check the available module names through the GDGoC ITB LMS dashboard in the "Courses" or "Modules" section.

## Development

To contribute to GOCI development, please fork this repository and create a pull request with your proposed features or fixes.

## License

MIT License