import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'visitasApp',
  webDir: 'dist',  // Asegúrate de que esto coincida con el directorio de construcción
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Camera: {
    },
  }
};

export default config;
