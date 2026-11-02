# SafeKey – Password Generator

**Create Strong. Stay Secure.**

SafeKey is a modern, responsive password generator that helps users create strong and random passwords with customizable settings. It uses the browser's cryptographic random number generator to generate passwords securely.

## Features

- Generate random passwords from 4 to 64 characters.
- Customize password length.
- Include uppercase letters (A–Z).
- Include lowercase letters (a–z).
- Include numbers (0–9).
- Include special characters.
- Exclude similar-looking characters.
- View password strength indicators.
- Copy generated passwords to the clipboard.
- Generate passwords instantly using the Enter key.
- Input validation with in-app warning messages.
- Responsive design for desktop and mobile devices.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Web Crypto API

## Project Structure

```text
SafeKey/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Live Demo

GitHub Pages deployment coming soon.

## How to Run Locally

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in your web browser.
4. Customize the password settings.
5. Click **Generate Password** to create a password.

## Password Security

SafeKey uses the Web Crypto API (`crypto.getRandomValues()`) for cryptographically secure random number generation.

Passwords are generated locally in the browser. They are not sent to a backend server or stored by SafeKey.

**Security reminder:** Do not share generated passwords or reuse passwords exposed during testing.

## Future Improvements

- Password history with optional local storage.
- Additional customization options.
- Further accessibility improvements.

---

**SafeKey – Create Strong. Stay Secure.**
