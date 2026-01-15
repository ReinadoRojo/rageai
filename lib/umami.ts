/**
 * I will use umami for usage tracking on the AI service.
 */

import umami from '@umami/node';

umami.init({
  websiteId: '7839702f-8d3e-483b-8c15-ecc3da1d16e1',
  hostUrl: 'rageai-seven.vercel.app',
});

async function serverTrack(data?: object) {
  try {
    const response = await fetch("https://api-gateway.umami.dev/api/send", {
      method: "POST",
      body: JSON.stringify({
        "type":"event",
        "payload": {
          "website":"7839702f-8d3e-483b-8c15-ecc3da1d16e1",
          "language":"en-US",
          "title":"RageAI",
          "hostname":"rageai-seven.vercel.app",
          "url":"https://rageai-seven.vercel.app/",
          "referrer":"",
          "id": "server:reserved",
          data
        }
      })
    })
    return response
  } catch(e) {
    throw e;
  }
}

export { umami, serverTrack };