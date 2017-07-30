export const UPLOAD_PHOTO = process.env.API_SERVER === 'test'
    ? 'http://localhost:2333/upload'
    : 'https://api.thehorizon.blue/upload';

export const WEB_ROOT = 'https://thehorizon.blue';
export const IMG_ROOT = 'https://thehorizon.blue/img/';
export const POST_ROOT = `${WEB_ROOT}/blog/post/`;

export const DRAFT_VISIBILITY_ID = 4;
export const PRIVATE_VISIBILITY_ID = 3;
export const RESTRICTED_VISIBILITY_ID = 2;
export const PUBLIC_VISIBILITY_ID = 1;
export const ADMIN_GROUP_ID = '1';
