import { promises as fs } from 'fs';
import path from 'path';
import ResizeImage from './resize';

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

export default class File {
  static imagesFullPath = path.resolve(__dirname, '../assets/images/full');
  static imagesThumbPath = path.resolve(__dirname, '../assets/images/thumb');

  // Get the path of an image based on parameters.
  static async getImagePath(params: ImageQuery): Promise<string | null> {
    if (!params.filename) return null;

    const isThumb = params.width && params.height;
    const filePath = isThumb
      ? path.resolve(
          this.imagesThumbPath,
          `${params.filename}-${params.width}x${params.height}.jpg`
        )
      : path.resolve(this.imagesFullPath, `${params.filename}.jpg`);

    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      return null;
    }
  }

  // Check if an image with given filename exists.
  static async isImageAvailable(filename: string = ''): Promise<boolean> {
    if (!filename) return false;

    try {
      const files = await fs.readdir(this.imagesFullPath);
      const available = new Set(files.map(file => path.parse(file).name));
      return available.has(filename);
    } catch {
      return false;
    }
  }

  // Retrieve all available image filenames.
  static async getAvailableImageNames(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.imagesFullPath);
      return files.map(file => path.parse(file).name);
    } catch {
      return [];
    }
  }

  // Check if a thumbnail with given parameters exists.
  static async isThumbAvailable(params: ImageQuery): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) return false;

    const thumbPath = path.resolve(
      this.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(thumbPath);
      return true;
    } catch {
      return false;
    }
  }

  // Ensure the thumbnail directory exists.
  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(this.imagesThumbPath);
    } catch {
      await fs.mkdir(this.imagesThumbPath, { recursive: true });
    }
  }

  // Create a thumbnail for a given image.
  static async createThumb(params: ImageQuery): Promise<string | null> {
    if (!params.filename || !params.width || !params.height) return null;

    const fullImagePath = path.resolve(
      this.imagesFullPath,
      `${params.filename}.jpg`
    );
    const thumbImagePath = path.resolve(
      this.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await ResizeImage(
        fullImagePath,
        thumbImagePath,
        parseInt(params.width),
        parseInt(params.height)
      );
      return null;
    } catch (error) {
      return error.message;
    }
  }
}
