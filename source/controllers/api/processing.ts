import express from 'express';
import File from '../../image-functions';

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

const validate = async (query: ImageQuery): Promise<null | string> => {
  if (!query.width && !query.height) {
    return null;
  }

  const width = parseInt(query.width || '');
  const height = parseInt(query.height || '');

  if (!Number.isFinite(width) || width <= 0) {
    return "Invalid 'width'. Please provide a positive number.";
  }

  if (!Number.isFinite(height) || height <= 0) {
    return "Invalid 'height'. Please provide a positive number.";
  }

  return null;
};

const images: express.Router = express.Router();

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const validationMessage = await validate(request.query);
    if (validationMessage) {
      response.status(200).send(validationMessage);
      return;
    }

    try {
      const thumbExists = await File.isThumbAvailable(request.query);
      if (!thumbExists) {
        const thumbCreationError = await File.createThumb(request.query);
        if (thumbCreationError) {
          response.status(500).send(thumbCreationError);
          return;
        }
      }

      const imagePath = await File.getImagePath(request.query);
      if (imagePath) {
        response.sendFile(imagePath);
      } else {
        response.status(200).send('Image not found.');
      }
    } catch (error) {
      response.status(500).send('Internal server error.');
    }
  }
);

images.get('/list', async (req, res) => {
  try {
    const imageNames = await File.getAvailableImageNames();
    res.json(imageNames);
  } catch (error) {
    res.status(500).send('Failed to retrieve image list.');
  }
});

export default images;
