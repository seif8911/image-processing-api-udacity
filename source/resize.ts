import sharp from 'sharp';

const ResizeImage = async (
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(inputPath)
    .resize(width, height)
    .toFormat('jpg')
    .toFile(outputPath);
};

export default ResizeImage;
