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

### Installation from NPM (Recommended)

```bash
# Install globally
npm install -g goci-cli

# Or use directly with npx (no installation needed)
npx goci-cli <email> <module_name> <file_path>
```

## Usage

After installation, you can check if GOCI is installed correctly by running:

```bash
goci --help
```

For submitting the assignment, use the following command:
```bash
goci <email> <module_name> <file_path>
```

Example:
```bash
goci john.doe@itb.ac.id "Introduction to JavaScript" ./assignment1.js
```

### Parameters

- `<email>`: Email registered in the GDGoC ITB LMS platform
- `<module_name>`: Module name that matches exactly with the one on the platform
- `<file_path>`: Path to the file you want to submit

## Usage Examples

1. Submitting a JavaScript file for "JavaScript Basics" module:
   ```bash
   goci student@itb.ac.id "JavaScript Basics" ./hello-world.js
   ```

2. Submitting a Python program for "Python Introduction" module:
   ```bash
   goci student@itb.ac.id "Python Introduction" ./my_app.py
   ```

3. Using npx without installation:
   ```bash
   npx goci-cli student@itb.ac.id "Web Development" ./index.html
   ```

## Troubleshooting

If you encounter issues, please make sure:

1. The email you're using is registered in the GDGoC ITB LMS system
2. The module name is typed correctly and exactly matches the one on the platform (case-sensitive)  
3. The file you want to submit exists and is accessible
4. You are connected to the internet

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