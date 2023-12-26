import { defineConfig } from '@ice/pkg';

// https://pkg.ice.work/reference/config/
export default defineConfig({
  plugins: [
    [
      '@ice/pkg-plugin-docusaurus',
      {
        host: 'localhost',
        title: '@sleepy/react-colors',
        navBarTitle: '@sleepy/react-colors',
        navBarLogo: 'https://raw.githubusercontent.com/sleepy-zone/react-colors/main/assets/logo.png',
        favicon: 'https://raw.githubusercontent.com/sleepy-zone/react-colors/main/assets/favicon.ico'
      }
    ]
  ],
});
