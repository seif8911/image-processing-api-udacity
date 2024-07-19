import express from 'express';
import routes from './controllers/router';
import path from 'path';

const app: express.Application = express();
const port: number = 3000; // Default port

// Serve static files
app.use(express.static(path.resolve(__dirname, '../frontend')));

// Add routes
app.use(routes);

// Start server
app.listen(port, async (): Promise<void> => {
  const url: string = `http://localhost:${port}`;
  console.log(`Project Hosted at ${url}`);
});

export default app;
