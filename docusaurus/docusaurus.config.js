// docusaurus.config.js
// Configuration for the Physical AI & Humanoid Robotics textbook website

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Bridging the gap between the digital brain and the physical body',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-panaversity-site.vercel.app', // This will be updated with actual deployment URL
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub Pages, this is usually '/<project-name>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'panaversity', // Usually your GitHub org/user name.
  projectName: 'physical-ai-textbook', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'], // English and Urdu for the hackathon requirements
    localeConfigs: {
      en: {
        direction: 'ltr',
        htmlLang: 'en-US',
        label: 'English',
      },
      ur: {
        direction: 'ltr', // Keep RTL layout disabled to preserve UI consistency
        htmlLang: 'ur',
        label: 'اردو',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/panaversity/physical-ai-textbook/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false, // Disable blog for textbook
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Physical AI Textbook',
        logo: {
          alt: 'Panaversity Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Textbook',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/panaversity/physical-ai-textbook',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Textbook',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/panaversity',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/panaversity',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/panaversity/physical-ai-textbook',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Panaversity. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  plugins: [
    // Plugin for the RAG chatbot integration
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'chatbot',
        path: 'chatbot/docs',
        routeBasePath: 'chatbot',
        sidebarPath: require.resolve('./chatbot/sidebars.js'),
      },
    ],
    // For personalization features
    [
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['html'],
        toExtensions: ['exe', 'zip'],
      },
    ],
  ],
};

export default config;
