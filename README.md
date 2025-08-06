# Project Dashboard

A modern web-based dashboard for managing and tracking your projects efficiently.

## Features

- 🚀 Modern web interface
- 📊 Project overview and management
- ⚙️ Configurable settings
- 📱 Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd project-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development Mode
Start the server with automatic restart on file changes:
```bash
npm run dev
```

### Production Mode
Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `GET /` - Main dashboard page
- `GET /api/health` - Health check endpoint

## Project Structure

```
project-dashboard/
├── index.js          # Main server file
├── package.json       # Project dependencies and scripts
├── README.md         # This file
└── public/           # Static files
    ├── index.html    # Main HTML page
    ├── styles.css    # CSS styles
    └── script.js     # Client-side JavaScript
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

ISC
