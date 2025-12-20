import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ur/chatbot',
    component: ComponentCreator('/ur/chatbot', '357'),
    routes: [
      {
        path: '/ur/chatbot',
        component: ComponentCreator('/ur/chatbot', '3b1'),
        routes: [
          {
            path: '/ur/chatbot',
            component: ComponentCreator('/ur/chatbot', '601'),
            routes: [
              {
                path: '/ur/chatbot/',
                component: ComponentCreator('/ur/chatbot/', '9c6'),
                exact: true,
                sidebar: "chatbotSidebar"
              },
              {
                path: '/ur/chatbot/archived/',
                component: ComponentCreator('/ur/chatbot/archived/', '448'),
                exact: true
              },
              {
                path: '/ur/chatbot/book-chapter',
                component: ComponentCreator('/ur/chatbot/book-chapter', '80f'),
                exact: true,
                sidebar: "chatbotSidebar"
              },
              {
                path: '/ur/chatbot/book-overview',
                component: ComponentCreator('/ur/chatbot/book-overview', '6d3'),
                exact: true
              },
              {
                path: '/ur/chatbot/chapter1',
                component: ComponentCreator('/ur/chatbot/chapter1', '521'),
                exact: true
              },
              {
                path: '/ur/chatbot/chapter2',
                component: ComponentCreator('/ur/chatbot/chapter2', '872'),
                exact: true
              },
              {
                path: '/ur/chatbot/chapter3',
                component: ComponentCreator('/ur/chatbot/chapter3', '299'),
                exact: true
              },
              {
                path: '/ur/chatbot/module1_ros/content',
                component: ComponentCreator('/ur/chatbot/module1_ros/content', 'b5f'),
                exact: true,
                sidebar: "chatbotSidebar"
              },
              {
                path: '/ur/chatbot/module2_simulation/content',
                component: ComponentCreator('/ur/chatbot/module2_simulation/content', '35c'),
                exact: true,
                sidebar: "chatbotSidebar"
              },
              {
                path: '/ur/chatbot/module3_nvidia_isaac/content',
                component: ComponentCreator('/ur/chatbot/module3_nvidia_isaac/content', 'ab5'),
                exact: true,
                sidebar: "chatbotSidebar"
              },
              {
                path: '/ur/chatbot/module4_vla/content',
                component: ComponentCreator('/ur/chatbot/module4_vla/content', 'e4c'),
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
    path: '/ur/docs',
    component: ComponentCreator('/ur/docs', 'c89'),
    routes: [
      {
        path: '/ur/docs',
        component: ComponentCreator('/ur/docs', 'f65'),
        routes: [
          {
            path: '/ur/docs',
            component: ComponentCreator('/ur/docs', '405'),
            routes: [
              {
                path: '/ur/docs/book-overview',
                component: ComponentCreator('/ur/docs/book-overview', '984'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/intro',
                component: ComponentCreator('/ur/docs/intro', '793'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-01/actuators-feedback',
                component: ComponentCreator('/ur/docs/module-01/actuators-feedback', 'aa0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-01/launch-composition',
                component: ComponentCreator('/ur/docs/module-01/launch-composition', '0e6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-01/llm-to-control',
                component: ComponentCreator('/ur/docs/module-01/llm-to-control', 'abc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-01/nodes-cognitive-units',
                component: ComponentCreator('/ur/docs/module-01/nodes-cognitive-units', '8e6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-01/parameters-runtime',
                component: ComponentCreator('/ur/docs/module-01/parameters-runtime', 'd0c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-01/physical-ai-nervous-system',
                component: ComponentCreator('/ur/docs/module-01/physical-ai-nervous-system', '237'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-01/python-agents-rclpy',
                component: ComponentCreator('/ur/docs/module-01/python-agents-rclpy', 'bd7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-01/ros2-dds-philosophy',
                component: ComponentCreator('/ur/docs/module-01/ros2-dds-philosophy', 'ddc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-01/topics-services-actions',
                component: ComponentCreator('/ur/docs/module-01/topics-services-actions', '082'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-01/urdf-humanoid-body',
                component: ComponentCreator('/ur/docs/module-01/urdf-humanoid-body', 'fdf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/digital-twins',
                component: ComponentCreator('/ur/docs/module-02/digital-twins', '31c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/domain-randomization',
                component: ComponentCreator('/ur/docs/module-02/domain-randomization', 'e75'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/gazebo-ros2',
                component: ComponentCreator('/ur/docs/module-02/gazebo-ros2', '708'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/gravity-collisions',
                component: ComponentCreator('/ur/docs/module-02/gravity-collisions', 'fab'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/humanoid-locomotion',
                component: ComponentCreator('/ur/docs/module-02/humanoid-locomotion', 'b9e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/module-summary',
                component: ComponentCreator('/ur/docs/module-02/module-summary', '921'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/noise-latency',
                component: ComponentCreator('/ur/docs/module-02/noise-latency', '3bd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/photorealism',
                component: ComponentCreator('/ur/docs/module-02/photorealism', 'da0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/physics-simulation',
                component: ComponentCreator('/ur/docs/module-02/physics-simulation', '83f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/sensor-modeling',
                component: ComponentCreator('/ur/docs/module-02/sensor-modeling', 'cd2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/transfer-strategies',
                component: ComponentCreator('/ur/docs/module-02/transfer-strategies', '6be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-02/unity-interaction',
                component: ComponentCreator('/ur/docs/module-02/unity-interaction', '8c6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/accelerated-computing',
                component: ComponentCreator('/ur/docs/module-03/accelerated-computing', '053'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/autonomy-stack',
                component: ComponentCreator('/ur/docs/module-03/autonomy-stack', '8e4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/gpu-physics-perception',
                component: ComponentCreator('/ur/docs/module-03/gpu-physics-perception', '3fd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/isaac-ros-hw',
                component: ComponentCreator('/ur/docs/module-03/isaac-ros-hw', 'c40'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/isaac-sim-architecture',
                component: ComponentCreator('/ur/docs/module-03/isaac-sim-architecture', '34a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/localization-mapping',
                component: ComponentCreator('/ur/docs/module-03/localization-mapping', 'f79'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/module-summary',
                component: ComponentCreator('/ur/docs/module-03/module-summary', 'b7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/nav2',
                component: ComponentCreator('/ur/docs/module-03/nav2', 'e72'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/path-planning',
                component: ComponentCreator('/ur/docs/module-03/path-planning', '7ba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/synthetic-data',
                component: ComponentCreator('/ur/docs/module-03/synthetic-data', 'cde'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/training-vision-models',
                component: ComponentCreator('/ur/docs/module-03/training-vision-models', 'c98'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-03/visual-slam',
                component: ComponentCreator('/ur/docs/module-03/visual-slam', '97e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-04/action-planning',
                component: ComponentCreator('/ur/docs/module-04/action-planning', 'ae9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-04/dialog-management',
                component: ComponentCreator('/ur/docs/module-04/dialog-management', '116'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-04/feedback-loop',
                component: ComponentCreator('/ur/docs/module-04/feedback-loop', 'f9e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-04/llms-in-vla',
                component: ComponentCreator('/ur/docs/module-04/llms-in-vla', '6d9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-04/module-summary',
                component: ComponentCreator('/ur/docs/module-04/module-summary', 'cec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-04/multimodal-fusion',
                component: ComponentCreator('/ur/docs/module-04/multimodal-fusion', 'a81'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-04/personalization',
                component: ComponentCreator('/ur/docs/module-04/personalization', 'e5a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-04/safety',
                component: ComponentCreator('/ur/docs/module-04/safety', '280'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-04/speech-and-voice',
                component: ComponentCreator('/ur/docs/module-04/speech-and-voice', '328'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-04/vision-perception',
                component: ComponentCreator('/ur/docs/module-04/vision-perception', 'e72'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/module-04/vla-intro',
                component: ComponentCreator('/ur/docs/module-04/vla-intro', 'a7f'),
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
    path: '/ur/',
    component: ComponentCreator('/ur/', 'f17'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
