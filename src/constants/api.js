export const UPLOAD_PHOTO = process.env.API_SERVER === 'test'
    ? 'http://localhost:2333/upload'
    : 'https://api.thehorizon.blue/upload';

export const WEB_ROOT = 'https://thehorizon.blue';
export const IMG_ROOT = `${WEB_ROOT}/static/img/`;
export const POST_ROOT = `${WEB_ROOT}/blog/post/`;
