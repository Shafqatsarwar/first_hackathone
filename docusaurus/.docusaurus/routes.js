import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/chatbot',
    component: ComponentCreator('/chatbot', '38a'),
    routes: [
      {
        path: '/chatbot',
        component: ComponentCreator('/chatbot', '424'),
        routes: [
          {
            path: '/chatbot',
            component: ComponentCreator('/chatbot', 'fd3'),
            routes: [
              {
                path: '/chatbot/docs/intro',
                component: ComponentCreator('/chatbot/docs/intro', '0df'),
                exact: true,
                sidebar: "defaultSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '633'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '0fe'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '119'),
            routes: [
              {
                path: '/docs/archived/',
                component: ComponentCreator('/docs/archived/', '4ab'),
                exact: true
              },
              {
                path: '/docs/book-chapter',
                component: ComponentCreator('/docs/book-chapter', 'dfd'),
                exact: true
              },
              {
                path: '/docs/book-overview',
                component: ComponentCreator('/docs/book-overview', '554'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapter1',
                component: ComponentCreator('/docs/chapter1', '7f8'),
                exact: true
              },
              {
                path: '/docs/chapter2',
                component: ComponentCreator('/docs/chapter2', 'db5'),
                exact: true
              },
              {
                path: '/docs/chapter3',
                component: ComponentCreator('/docs/chapter3', '52e'),
                exact: true
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module1_ros/content',
                component: ComponentCreator('/docs/module1_ros/content', '5b1'),
                exact: true
              },
              {
                path: '/docs/module2_simulation/content',
                component: ComponentCreator('/docs/module2_simulation/content', 'c1a'),
                exact: true
              },
              {
                path: '/docs/module3_nvidia_isaac/content',
                component: ComponentCreator('/docs/module3_nvidia_isaac/content', '517'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
