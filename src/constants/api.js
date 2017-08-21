export const UPLOAD_PHOTO = process.env.API_SERVER === 'test'
    ? 'http://localhost:2333/upload'
    : 'https://api.thehorizon.blue/upload';

export const WEB_ROOT = 'https://thehorizon.blue';
export const IMG_ROOT = `${WEB_ROOT}/img`;
export const SMALL_IMG = `${IMG_ROOT}/resized/small`;
export const LARGE_IMG = `${IMG_ROOT}/resized/large`;
export const ORIG_IMG = IMG_ROOT;


export const DRAFT_VISIBILITY_ID = 4;
export const PRIVATE_VISIBILITY_ID = 3;
export const RESTRICTED_VISIBILITY_ID = 2;
export const PUBLIC_VISIBILITY_ID = 1;
export const ADMIN_GROUP_ID = '1';
