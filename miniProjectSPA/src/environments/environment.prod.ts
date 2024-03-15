const port = 5268;
const ip = `${window.location.hostname}:${port}`;
const apiUrl = `http://${ip}`;

export const environment = {
  production: true,
  apiUrl: `${apiUrl}/api`,
  baseUrl: `${apiUrl}/`,
};
