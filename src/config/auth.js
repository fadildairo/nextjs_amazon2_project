import { WebAuth } from 'auth0-js';

export const webAuth = new WebAuth({
    clientID: 'tQE3xrDOQdMikbviiuYrfJglfSA2rQQk',
    domain: 'https://dev-d1zaamdm.us.auth0.com',
    redirectUri: 'https://nextjs-amazon2-project.vercel.app/',
    responseType: 'token',
  });