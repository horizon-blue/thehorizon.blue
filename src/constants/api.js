export const UPLOAD_PHOTO = process.env.API_SERVER === 'test'
    ? 'http://localhost:2333/upload'
    : 'https://api.thehorizon.blue/upload';

export const IMG_ROOT = 'https://thehorizon.blue/static/img/';
