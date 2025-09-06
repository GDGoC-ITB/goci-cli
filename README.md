# GOCI — GDGoC ITB Command Line Interface

A fast, reliable CLI to submit assignments to the **GDGoC ITB** Learning Management System.

---

## 🧰 Prerequisites

- **Node.js** and **npm** (LTS recommended)

Verify:
```bash
node --version
npm --version
````

---

## 📦 Installation

### Using npm (recommended)

```bash
# Install globally
npm install -g goci-cli@latest

# Or use directly without installing
npx goci-cli --help
```

> Note: the published npm package name may differ depending on your registry setup.

---

## 🚀 Commands

```bash
goci --help         # Show help
goci -v             # Show CLI version
goci login          # Log in via browser (stores a local token)
goci logout         # Log out (deletes the local token)
goci submit "<Module Name>" <arg>   # Submit an assignment
```

**`<arg>` semantics**

* **File path** → for modules that support **GOCI** (file upload)
* **URL** → for modules that support **Link**

The CLI automatically resolves the module’s supported types and picks the right path based on your payload.

---

## 🧪 Examples

### 1) Log in

```bash
goci login
```

Your browser opens for authentication. Close the tab once successful.

### 2) Submit a file (GOCI)

```bash
goci submit "Introduction to Flutter" "./Week 10 Report.pdf"
# On Windows, always quote paths with spaces
```

### 3) Submit a link (Link)

```bash
goci submit "HTML & CSS Fundamentals" "https://gist.github.com/your-id/abcd1234"
```

### 4) Log out

```bash
goci logout
```

---

## 🛠️ Troubleshooting

1. **“You are not logged in.”**
   Run `goci login` and complete the browser flow.

2. **“Your session has expired.”**
   Token is invalid/expired. Run `goci login` again (the CLI removes the old token).

3. **“Module "<name>" not found.”**

   * Make sure the module name is correct.
   * The server checks case-insensitively, but it’s best to copy the exact title from LMS.

4. **“Module does not support Link/GOCI.”**
   Your payload type doesn’t match the module’s supported submission types.

   * Use a **URL** for **Link** modules.
   * Use a **file path** for **GOCI** modules.

5. **“Payload is neither a valid URL nor an existing file path.”**

   * For **Link**: ensure the URL starts with `http://` or `https://`.
   * For **GOCI**: ensure the file exists and quote paths with spaces.

6. **Windows paths with spaces**
   Always quote:

   ```bash
   goci submit "Intro to JS" "C:\Users\Me\Documents\my code\app.js"
   ```

7. **Network / server errors**
   Check your internet connection and confirm the LMS API is reachable.

---

## ❓ FAQ

**Do I need to pass my email to submit?**
No. The latest version uses your **login token** (not an email argument).

**Is the module name case-sensitive?**
The backend matches **case-insensitively**, but using the exact LMS title is recommended.

**Which file types can I upload?**
Depends on server policy. By default, the middleware accepts categories: `code`, `image`, `document`.

---

## 📄 License

**MIT License**