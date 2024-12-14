// logic for uploading images to S3, retrieving image URLs, and updating an ingredient's image URL

const s3 = require('../config/aws');
const { v4: uuidv4 } = require('uuid');

/**
 * Upload an ingredient image to S3 and return the public URL.
 * @param {Buffer} buffer - The image file buffer.
 * @param {string} filename - The original filename.
 * @returns {Promise<string>} - The URL of the uploaded image.
 */
async function uploadIngredientImage(buffer, filename) {
  const key = `ingredients/${uuidv4()}-${filename}`;
  
  await s3.putObject({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ACL: 'public-read',
    ContentType: 'image/png', // Ideally detect the mime type from the file
  }).promise();

  const url = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
  return url;
}

/**
 * Delete an ingredient image from S3 given its URL.
 * @param {string} imageUrl - The S3 image URL stored in the database.
 */
async function deleteIngredientImage(imageUrl) {
  if (!imageUrl) return;
  
  // Extract the key from the URL
  // imageUrl format: https://<bucket>.s3.amazonaws.com/ingredients/<uuid>-<filename>
  const bucketName = process.env.S3_BUCKET_NAME;
  const prefix = `https://${bucketName}.s3.amazonaws.com/`;
  
  if (!imageUrl.startsWith(prefix)) return; // URL not matching expected pattern
  
  const key = imageUrl.replace(prefix, '');
  
  await s3.deleteObject({
    Bucket: bucketName,
    Key: key,
  }).promise();
}

module.exports = { uploadIngredientImage, deleteIngredientImage };
