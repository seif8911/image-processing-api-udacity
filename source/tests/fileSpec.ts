import { promises as fs } from 'fs';
import path from 'path';
import File from '../image-functions';

describe('Image Processing Tests using Sharp Library', () => {
  it('should raise an error for invalid width value', async () => {
    const error = await File.createThumb({
      filename: 'doesntexist',
      width: '-100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('should raise an error for non-existent filename', async () => {
    const error = await File.createThumb({
      filename: 'nonexistent',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('should successfully create resized thumbnail for valid inputs', async () => {
    await File.createThumb({
      filename: 'fjord',
      width: '150',
      height: '165'
    });

    const resizedImagePath = path.resolve(
      File.imagesThumbPath,
      `fjord-150x165.jpg`
    );
    let errorFile = null;

    try {
      await fs.access(resizedImagePath);
    } catch (err) {
      errorFile = 'Error: File was not created';
    }

    expect(errorFile).toBeNull();
  });
});

// Cleanup after tests
afterAll(async () => {
  const resizedImagePath = path.resolve(
    File.imagesThumbPath,
    'fjord150x165.jpg'
  );

  try {
    await fs.unlink(resizedImagePath);
  } catch (err) {
    // Handle error if necessary
  }
});
