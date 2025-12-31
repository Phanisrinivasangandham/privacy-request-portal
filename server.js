
const express = require('express');
const path = require('path');
const app = express();

/**
 * Cloud Run provides the PORT environment variable.
 * The application must listen on this port.
 */
const port = process.env.PORT || 8080;

// Middleware to serve static files from the project root
app.use(express.static(__dirname));

/**
 * Single Page Application (SPA) Support:
 * Routes all non-file requests back to index.html so the client-side
 * router can handle them.
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Privacy Portal service is running on port ${port}`);
});
