# 📄 Collaborative Editor

A real-time collaborative editor where multiple users can work on the same shared document.
The key requirement was:
👉 **when one user edits a line, it should be locked so that no other user can edit the same line until it is released.**

In addition, the editor has been enhanced to support **live document updates** so that every user sees changes instantly, keeping the document fully synchronized.

---

## 🚀 Features

* 🔒 **Line-level locking** – ensures only one user can edit a line at a time
* ⚡ **Live updates** – any change is instantly visible to all users
* 👥 **Multi-user support** – multiple collaborators can work in real-time
* 🔗 **Socket.IO integration** – bi-directional event-based communication
* 🖥️ **React-based UI** – clean, simple, and responsive interface

---

## 🛠️ Tech Stack

* **Frontend:** React, TailwindCSS
* **Backend:** Node.js, Socket.IO
* **Runtime:** Node.js

---

### 2️⃣ Install dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```
### 3️⃣ URL replacement

Frontend: change the url into [http://localhost:4000]

### 4️⃣ Run locally

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm start
```

### 4️⃣ Access the app

Open [http://localhost:3000] in your browser.
