import { CapacitorConfig } from '@capacitor/cli';
import * as os from 'node:os';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'my-app',
  webDir: '../../dist/apps/my-app/browser',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

if (process.env.LIVE === 'true') {
  const localIp = getIp();
  const port = process.env.PORT || '4200';
  config.server = { url: `http://${localIp}:${port}`, cleartext: true };
} else {
  Reflect.deleteProperty(config, 'server');
}

function getIp() {
  const interfaces = os.networkInterfaces();
  const addresses = Object.values(interfaces)
    .flat()
    .filter((details) => details?.family === 'IPv4' && !details?.internal)
    .map((details) => details?.address);

  return addresses[0];
}

export default config;
