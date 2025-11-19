import { version } from './package.json';

export default ({ config }) => {
  const now = new Date();
  // Auto-generate versionCode: YYYYMMDD + HHMM
  const versionCode = parseInt(
    `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`
  );

  return {
    ...config,
    version: version, // ambil dari package.json
    android: {
      ...config.android,
      versionCode,
    }
  };
};
