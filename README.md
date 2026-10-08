# Little Lemon Restaurant Website

A React website for the fictional Little Lemon restaurant, developed as part of the Coursera Meta Front-End Developer Capstone.

Visitors can browse restaurant information and specials, complete a table reservation form and view their reservation confirmation.

## Features

- Responsive layouts and mobile navigation.
- Table reservations with date, time, guest count and occasion selection.
- HTML5 and React form validation.
- Available reservation times supplied by a mock API.
- Confirmation page displaying submitted reservation details.
- Successful bookings saved in local storage.
- Temporary form drafts saved in session storage, with a discard option.

## Technologies

- React
- React Router
- JavaScript, HTML and CSS
- Create React App
- Jest and React Testing Library
- Browser local storage and session storage

## Prerequisites

Install Node.js and npm. Git is required if cloning the repository.

Check that these tools are available:

```bash
node --version
npm --version
git --version
```

## Setup

### 1. Download the project

Clone the repository:

```bash
git clone https://github.com/carlosesierra/little-lemon.git
cd little-lemon
```

Alternatively, download and extract the repository ZIP, then open a terminal inside the folder containing `package.json`.

### 2. Install dependencies

```bash
npm ci
```

This installs the dependencies recorded in `package-lock.json`.

### 3. Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

The page reloads when source files change. If port 3000 is occupied, follow the terminal prompt and use the address it displays.

Press **Ctrl+C** in the terminal to stop the server.

## Using the Reservation Form

1. Select **Reservations** or **Reserve a Table**.
2. Enter a name with at least two characters and a valid email.
3. Choose today or a future date.
4. Select an available time.
5. Enter a whole number between 1 and 10 guests.
6. Choose an occasion.
7. Select **Make Your Reservation**.
8. Check the reservation details on the confirmation page.

The submit control remains disabled until the form is valid.

An unfinished draft is restored when returning to the form in the same browser tab, provided session storage is available. Select **Discard draft** to reset it.

## Running Tests

Run all tests once:

```bash
npm test -- --watchAll=false
```

Run tests in interactive watch mode:

```bash
npm test
```

The existing tests cover static text, reservation availability functions, form validation, submission callbacks and local-storage behaviour.

## Creating a Production Build

```bash
npm run build
```

The generated production files are placed in the `build/` directory.

When deploying, configure the host to serve `index.html` for application routes such as `/booking` and `/booking-confirmed`.

## Application Routes

| Route | Purpose |
|---|---|
| `/` | Restaurant home page |
| `/booking` | Reservation form and available times |
| `/booking-confirmed` | Confirmation details after successful submission |

Opening the confirmation route without successful submission state displays guidance instead of a reservation confirmation.

## Mock API and Browser Storage

The course demonstration API is bundled in `public/api.js` and loaded by `public/index.html`.

- `fetchAPI(date)` returns demonstration reservation times.
- `submitAPI(formData)` simulates successful submission.

No API keys, environment variables, database setup or separate backend server are required.

This is an educational demonstration. Submissions do not create real restaurant reservations.

Bookings use the `bookings` local-storage key. Drafts use the `bookingDraft` session-storage key. These records are specific to the browser and website origin; they are not shared across devices.

## Troubleshooting

- **`node` or `npm` is not found:** install Node.js and npm, then reopen the terminal.
- **The project does not start:** confirm you are inside the folder containing `package.json` and have completed dependency installation.
- **`npm ci` reports a lockfile mismatch:** `package.json` and `package-lock.json` need to be synchronized by the project maintainer.
- **`fetchAPI` is undefined:** confirm `public/api.js` exists and its script tag remains in `public/index.html`.
- **The submit control stays disabled:** check every required field, including the selected date, available time and guest count.
- **A `punycode` deprecation warning appears:** check the final test or build result separately. The warning has appeared during successful test runs.

## Author

Carlos Sierra  
Coursera Meta Front-End Developer Capstone