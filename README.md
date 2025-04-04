# Nivestor AI
Nivestor AI is a trading education platform designed to empower novice investors in the stock and crypto markets. The project combines a modern web-based client with a Python-powered server to deliver real-time market insights, educational resources, and AI-driven trading guidance.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

Nivestor AI is tailored for new investors with limited capital (e.g., ₹2000), aiming to demystify the markets through:
- **Real-time analytics**: Live updates on stocks and cryptocurrencies.
- **Pre-market and end-of-day notifications**: Key insights to start and close your trading day.
- **AI-powered guidance**: Assistance in making smarter trading decisions.
- **Interactive learning**: Educational modules and a chatbot to explain market trends and trading logic.

## Features

- **Client Interface**: A responsive web interface (built with JavaScript) for viewing live market data, notifications, and educational content.
- **Server Backend**: A Python-based server handling data processing, AI computations, and API integrations.
- **Real-Time Updates**: Get timely market alerts and performance summaries.
- **Educational Tools**: Learn trading strategies and market analysis techniques via integrated tutorials and chatbot interactions.

## Project Structure
```bash
The repository is organized into two main directories:
NivestorAI/
├── client/       # Frontend code (JavaScript/React or similar)
├── server/       # Backend code (Python APIs, AI modules)
├── .gitignore    # Files and directories to ignore in version control
```

This structure separates concerns, making it easier to manage the UI and backend logic independently.
## Installation

### Prerequisites
- **Git**: To clone the repository.
- **Python** (version 3.7+): For the server components.
- **Node.js** and **npm**: For the client components.


### Steps

1. **Clone the Repository**

```bash
git clone https://github.com/AnmolChauhan1234/NivestorAI.git
cd NivestorAI
```
2.**Setup the Server**

Navigate to the server directory and install Python dependencies:

```bash
cd server
pip install -r requirements.txt
```
Note: If a `requirements.txt` file is not present, please add the necessary dependencies or instructions for setting up your Python environment.

3.**Setup the Client**

Open a new terminal, navigate to the client directory, and install Node.js packages:
```bash
cd client
npm install
```
4. **Configuration**
    
    Create and configure any necessary environment files (for example, a `.env` file) for API keys, database connections, or other settings required by your application.
    

## Usage

### Running the Server

From the `server` directory, run the main server file:
```bash 
python main.py
```
### Running the Client

From the `client` directory, start the web application:
```bash
npm start
```
After starting both components, open your browser to access the client interface (typically at http://localhost:3000).
## Contact

For questions or feedback, please contact:

- **Name:** AnmolChauhan
    
- **Email:** [anmolchauhan1234@gmail.com]
    
- **GitHub:** [AnmolChauhan1234](https://github.com/AnmolChauhan1234)
