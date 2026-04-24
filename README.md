# The Bank of issuereporter1234 (v2)

A simple bank simulation with a Node.js/Express backend. The focus of this project is backend architecture — the UI is intentionally minimal, just enough to interact with the system.

## Features

- Add new accounts
- Delete accounts
- Transfer funds between accounts (use a recipients ID)
- Withdraw cash via ATM (use `ATM` as the recipient)
- Accounts are accessible with a single click — no login, no passwords
- 404 handling for unknown routes
- Overdraft allowed (no balance floor — fix planned)

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** Vanilla HTML/CSS/JS (minimal)

## Getting Started

```bash
git clone https://github.com/issuereporter1234/the-bank-of-issuereporter1234.git
cd the-bank-of-issuereporter1234
npm install
node index.js
```

Then open `http://localhost:3000` in your browser.

## Known Limitations / Planned Features

- [ ] Full transaction log per account
- [ ] Balance floor / overdraft protection
- [ ] Authentication (login system)
- [ ] Improved UI/UX

## Notes

This project is intentionally backend-focused. UI/UX is kept minimal — no styling frameworks, no fancy design. The goal was to build and understand server-side logic, routing, and data flow.
