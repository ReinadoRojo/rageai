/**
 * I will use umami for usage tracking on the AI service.
 */

import umami from '@umami/node';

umami.init({
  websiteId: '7839702f-8d3e-483b-8c15-ecc3da1d16e1',
  hostUrl: 'rageai-seven.vercel.app',
});

export { umami };