module.exports = {
  title: 'Mobile Apps Development',
  tagline: 'Course docs and slides',
  url: 'https://achchuthany.github.io',
  baseUrl: '/react-native/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/favicon.ico',
  organizationName: 'achchuthany',
  projectName: 'react-native',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/achchuthany/react-native/edit/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
