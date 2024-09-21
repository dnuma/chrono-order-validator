# Project Description

This project focuses on validating the article sorting on Hacker News' "newest" page. It checks if the first 100 articles are arranged precisely in descending order of submission time (newest to oldest).

## Technologies Used

* **JavaScript (JS)**: The core programming language driving the validation logic.
* **Playwright**: A powerful browser automation library for interacting with Hacker News and extracting article information.
* **Page Object Model (POM)**: Enhances code organization and maintainability by abstracting web page elements into reusable objects.
* **Front End Testing**: Ensures the user interface functions as intended by simulating user actions and verifying visual elements.
* **API Testing**: Interacts with the Hacker News API to retrieve article data directly for comparison and validation.

## How It Works

1. **Navigate to Hacker News:** Playwright launches a browser and navigates to the "newest" page ([https://news.ycombinator.com/newest](https://news.ycombinator.com/newest)).
2. **Extract Article Information:** The Page Object Model helps identify article elements on the page. Playwright extracts titles, submission times, and other relevant data for the first 100 articles.
3. **API Validation (Optional):** Fetches article data from the Hacker News API to cross-check with the information extracted from the web page.
4. **Sorting Validation:** JavaScript logic compares the submission times of the articles to ensure they are in strictly descending order.
5. **Test Results:** The project reports whether the first 100 articles are correctly sorted or if any discrepancies are found.

## Setup and Execution

To run the test scripts, you will need to have Node.js and the npm package manager installed on your machine. You can download the latest version of Node.js from the official website at https://nodejs.org/.

Once you have Node.js installed, you can clone this repository to your local machine using Git.

### Clone the repository:

``` bash
git clone https://github.com/dnuma/chrono-order-validator.git
```

### Install dependencies:

```bash
npm install
```

### Run the project:

```bash 
npm run test @hackernews
```
