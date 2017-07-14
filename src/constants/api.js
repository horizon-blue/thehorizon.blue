export const UPLOAD_PHOTO = process.env.API_SERVER === 'test'
    ? 'http://localhost:2333/upload'
    : 'https://api.thehorizon.blue/upload';

export const WEB_ROOT = 'https://thehorizon.blue';
export const IMG_ROOT = 'http://horizonblue.oss-us-west-1.aliyuncs.com/img/';
export const PREV_IMG_ROOT = `${WEB_ROOT}/static/img/`;
export const POST_ROOT = `${WEB_ROOT}/blog/post/`;

export const DRAFT_VISIBILITY_ID = 4;
export const ADMIN_GROUP_ID = '1';
