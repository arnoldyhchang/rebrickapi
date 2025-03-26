export interface IEnvSettings extends Window {
  REACT_APP_API_URL: string;
  REACT_APP_API_KEY: string;
}

export const envSettings = window as IEnvSettings & typeof globalThis;

export const envConfig = {
  apiUrl: envSettings.REACT_APP_API_URL,
  apiKey: envSettings.REACT_APP_API_KEY,
};
