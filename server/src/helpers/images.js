import multer from 'multer';
import util from 'util';
import fs from 'fs';
import path from 'path';
import config from '../config';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

async function uploadImageToCloudinary(filePath, uniqueFilename) {
  const image = await cloudinary.uploader.upload(filePath, { public_id: `user/${uniqueFilename}`, tags: 'user' });
  return image;
}

async function uploadImage(keyName) {
  const upload = util.promisify(multer({
    storage,
    fileFilter(req, file, callback) {
      const ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'));
      }
      return callback(null, true);
    },
  }).single(keyName));
  return upload;
}

async function removeImage(filePath) {
  const unlink = util.promisify(fs.unlink);
  await unlink(filePath);
}

export default {
  uploadImage,
  uploadImageToCloudinary,
  removeImage,
};
