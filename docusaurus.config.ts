import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Portfolio',
  tagline: 'Turning complex ideas into working systems',
  favicon: 'img/favicon.ico',

  url: 'https://max-rohrhirsch.com',
  baseUrl: '/',
  
  scripts: [
    {
      src: 'https://kit.fontawesome.com/4f61744fc1.js',
      crossorigin: 'anonymous',
    }
  ],

  organizationName: 'Max-Rohrhirsch',
  projectName: 'documentation',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Max-Rohrhirsch/documentation',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/Max-Rohrhirsch/documentation',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Home',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/about',
          position: 'left',
          label: 'About Me',
        },
        {
          to: '/projects',
          position: 'left',
          label: 'Projects',
        },
        {
          to: 'https://blog.max-rohrhirsch.com/',
          position: 'left',
          label: 'Blog',
        },
        {
          to: '/gallery',
          position: 'left',
          label: 'Adventure Gallery',
        },
        {
          to: '/impressum',
          position: 'right',
          label: 'Imprint',
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Docs',
              to: '/docs/Überblick',
            },
            {
              label: 'About Me',
              to: '/about',
            },
            {
              label: 'Projects',
              to: '/projects',
            },
          ],
        },
        {
          title: 'Contact',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Max-Rohrhirsch',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/max-rohrhirsch-77301a310/',
            },
            {
              label: 'E-Mail',
              href: 'mailto:max.rohrhirsch2004@gmail.com',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Imprint',
              to: '/impressum',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Max Rohrhirsch.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
