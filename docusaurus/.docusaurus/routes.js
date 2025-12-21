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
    component: ComponentCreator('/chatbot', 'd49'),
    routes: [
      {
        path: '/chatbot',
        component: ComponentCreator('/chatbot', '61c'),
        routes: [
          {
            path: '/chatbot',
            component: ComponentCreator('/chatbot', 'e72'),
            routes: [
              {
                path: '/chatbot/',
                component: ComponentCreator('/chatbot/', 'a2a'),
                exact: true,
                sidebar: "chatbotSidebar"
              },
              {
                path: '/chatbot/archived/',
                component: ComponentCreator('/chatbot/archived/', '0b7'),
                exact: true
              },
              {
                path: '/chatbot/book-chapter',
                component: ComponentCreator('/chatbot/book-chapter', 'bed'),
                exact: true,
                sidebar: "chatbotSidebar"
              },
              {
                path: '/chatbot/book-overview',
                component: ComponentCreator('/chatbot/book-overview', 'ad6'),
                exact: true
              },
              {
                path: '/chatbot/chapter1',
                component: ComponentCreator('/chatbot/chapter1', '0dd'),
                exact: true
              },
              {
                path: '/chatbot/chapter2',
                component: ComponentCreator('/chatbot/chapter2', '25b'),
                exact: true
              },
              {
                path: '/chatbot/chapter3',
                component: ComponentCreator('/chatbot/chapter3', '736'),
                exact: true
              },
              {
                path: '/chatbot/module1_ros/content',
                component: ComponentCreator('/chatbot/module1_ros/content', 'd00'),
                exact: true,
                sidebar: "chatbotSidebar"
              },
              {
                path: '/chatbot/module2_simulation/content',
                component: ComponentCreator('/chatbot/module2_simulation/content', '0cc'),
                exact: true,
                sidebar: "chatbotSidebar"
              },
              {
                path: '/chatbot/module3_nvidia_isaac/content',
                component: ComponentCreator('/chatbot/module3_nvidia_isaac/content', '313'),
                exact: true,
                sidebar: "chatbotSidebar"
              },
              {
                path: '/chatbot/module4_vla/content',
                component: ComponentCreator('/chatbot/module4_vla/content', '63c'),
                exact: true,
                sidebar: "chatbotSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'fa4'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '558'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '0ef'),
            routes: [
              {
                path: '/docs/book-overview',
                component: ComponentCreator('/docs/book-overview', '554'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-01/actuators-feedback',
                component: ComponentCreator('/docs/module-01/actuators-feedback', '4a5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-01/launch-composition',
                component: ComponentCreator('/docs/module-01/launch-composition', 'b02'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-01/llm-to-control',
                component: ComponentCreator('/docs/module-01/llm-to-control', '892'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-01/nodes-cognitive-units',
                component: ComponentCreator('/docs/module-01/nodes-cognitive-units', '083'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-01/parameters-runtime',
                component: ComponentCreator('/docs/module-01/parameters-runtime', '1f8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-01/physical-ai-nervous-system',
                component: ComponentCreator('/docs/module-01/physical-ai-nervous-system', 'd98'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-01/python-agents-rclpy',
                component: ComponentCreator('/docs/module-01/python-agents-rclpy', '777'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-01/ros2-dds-philosophy',
                component: ComponentCreator('/docs/module-01/ros2-dds-philosophy', '2e4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-01/topics-services-actions',
                component: ComponentCreator('/docs/module-01/topics-services-actions', '4d5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-01/urdf-humanoid-body',
                component: ComponentCreator('/docs/module-01/urdf-humanoid-body', '26d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/digital-twins',
                component: ComponentCreator('/docs/module-02/digital-twins', '2fb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/domain-randomization',
                component: ComponentCreator('/docs/module-02/domain-randomization', 'e02'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/gazebo-ros2',
                component: ComponentCreator('/docs/module-02/gazebo-ros2', '7a7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/gravity-collisions',
                component: ComponentCreator('/docs/module-02/gravity-collisions', 'db7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/humanoid-locomotion',
                component: ComponentCreator('/docs/module-02/humanoid-locomotion', '1df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/module-summary',
                component: ComponentCreator('/docs/module-02/module-summary', '2f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/noise-latency',
                component: ComponentCreator('/docs/module-02/noise-latency', '68c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/photorealism',
                component: ComponentCreator('/docs/module-02/photorealism', '36d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/physics-simulation',
                component: ComponentCreator('/docs/module-02/physics-simulation', '3df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/sensor-modeling',
                component: ComponentCreator('/docs/module-02/sensor-modeling', '595'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/transfer-strategies',
                component: ComponentCreator('/docs/module-02/transfer-strategies', '26c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-02/unity-interaction',
                component: ComponentCreator('/docs/module-02/unity-interaction', '14a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/accelerated-computing',
                component: ComponentCreator('/docs/module-03/accelerated-computing', '820'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/autonomy-stack',
                component: ComponentCreator('/docs/module-03/autonomy-stack', '737'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/gpu-physics-perception',
                component: ComponentCreator('/docs/module-03/gpu-physics-perception', '6ac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/isaac-ros-hw',
                component: ComponentCreator('/docs/module-03/isaac-ros-hw', '2bd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/isaac-sim-architecture',
                component: ComponentCreator('/docs/module-03/isaac-sim-architecture', '5f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/localization-mapping',
                component: ComponentCreator('/docs/module-03/localization-mapping', 'b0e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/module-summary',
                component: ComponentCreator('/docs/module-03/module-summary', '57a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/nav2',
                component: ComponentCreator('/docs/module-03/nav2', '761'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/path-planning',
                component: ComponentCreator('/docs/module-03/path-planning', 'd81'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/synthetic-data',
                component: ComponentCreator('/docs/module-03/synthetic-data', 'b63'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/training-vision-models',
                component: ComponentCreator('/docs/module-03/training-vision-models', '39a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-03/visual-slam',
                component: ComponentCreator('/docs/module-03/visual-slam', '68e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-04/action-planning',
                component: ComponentCreator('/docs/module-04/action-planning', '049'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-04/dialog-management',
                component: ComponentCreator('/docs/module-04/dialog-management', '114'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-04/feedback-loop',
                component: ComponentCreator('/docs/module-04/feedback-loop', '0e1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-04/llms-in-vla',
                component: ComponentCreator('/docs/module-04/llms-in-vla', '8d4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-04/module-summary',
                component: ComponentCreator('/docs/module-04/module-summary', '7f6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-04/multimodal-fusion',
                component: ComponentCreator('/docs/module-04/multimodal-fusion', 'c0d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-04/personalization',
                component: ComponentCreator('/docs/module-04/personalization', 'd2f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-04/safety',
                component: ComponentCreator('/docs/module-04/safety', '928'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-04/speech-and-voice',
                component: ComponentCreator('/docs/module-04/speech-and-voice', 'a8e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-04/vision-perception',
                component: ComponentCreator('/docs/module-04/vision-perception', 'f8c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/module-04/vla-intro',
                component: ComponentCreator('/docs/module-04/vla-intro', '143'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
