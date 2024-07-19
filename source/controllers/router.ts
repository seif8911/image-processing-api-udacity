import express from 'express';
import imagesRouter from './api/processing';
import uploadRouter from './api/upload';

const router = express.Router();

router.use('/api/images', imagesRouter);
router.use('/api/upload', uploadRouter);

// Root route handler
router.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to The API</h1>
    <h4>psst, i have no idea why you're here when you could use the frontend to basically do everything but you can also use the api in your browser if thats what you prefer, you can access the frontend <a href="localhost:3000">Here!</a></h4>
    <p>Listening at <code><a href="/api/images">/api/images</a></code> for queries containing at least a valid filename. Optionally use both width and height to set the size...</p>
    <p>Examples:
      <ul>
        <li><a href="/api/images?filename=fjord">/api/images?filename=fjord</a></li>
        <li><a href="/api/images?filename=fjord&width=100&height=100">/api/images?filename=fjord&width=100&height=100</a></li>
      </ul>
    </p>
  `);
});

export default router;

// its 4:32 AM right now, i have no idea if this will work or not :sob:
