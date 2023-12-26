import { defineConfig } from '@ice/pkg';

// https://pkg.ice.work/reference/config/
export default defineConfig({
  sourceMaps: 'inline',
  plugins: [
    [
      '@ice/pkg-plugin-docusaurus',
      {
        host: 'localhost',
        title: '@sleepy/react-colors',
        navBarTitle: '@sleepy/react-colors'
      }
    ]
  ],
});
