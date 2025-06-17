# 📇 Contact Manager App

A simple contact management application built with **React** and **json-server**.

## 🚀 Features

- View all contacts
- Add new contact
- Edit existing contact
- Delete contact
- Search contacts by name or email
- Persist data using `json-server`

---

## 🛠 Technologies Used

- React
- React Router DOM v6
- Semantic UI
- Axios
- uuid
- json-server

---

## 📦 Installation

```bash
npm install

Start the backend (json-server):
bash:
npx json-server --watch db.json --port 3006

Start the frontend (React):
bash:
npm start

src/
├── components/
│   ├── AddContact.js
│   ├── EditContact.js
│   ├── ContactList.js
│   ├── ContactCard.js
│   ├── ContactDetails.js
│   └── Header.js
├── api/
│   └── contacts.js
├── images/
│   └── user.png
├── App.js
└── index.js
