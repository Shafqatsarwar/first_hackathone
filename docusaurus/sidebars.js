// sidebars.js
// Sidebars for the Physical AI & Humanoid Robotics textbook

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Course Modules',
      items: [
        {
          type: 'category',
          label: 'Module 1: The Robotic Nervous System (ROS 2)',
          items: [
            'module1/intro-ros2',
            'module1/nodes-topics-services',
            'module1/rclpy-integration',
            'module1/urdf-humanoids'
          ],
        },
        {
          type: 'category',
          label: 'Module 2: The Digital Twin (Gazebo & Unity)',
          items: [
            'module2/intro-simulation',
            'module2/gazebo-physics',
            'module2/unity-rendering',
            'module2/sensor-simulation'
          ],
        },
        {
          type: 'category',
          label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
          items: [
            'module3/intro-nvidia-isaac',
            'module3/isaac-sim',
            'module3/isaac-ros',
            'module3/nav2-bipedal'
          ],
        },
        {
          type: 'category',
          label: 'Module 4: Vision-Language-Action (VLA)',
          items: [
            'module4/intro-vla',
            'module4/voice-to-action',
            'module4/cognitive-planning',
            'module4/capstone-project'
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Weekly Breakdown',
      items: [
        'weekly/weeks-1-2-intro-physical-ai',
        'weekly/weeks-3-5-ros2-fundamentals',
        'weekly/weeks-6-7-gazebo-simulation',
        'weekly/weeks-8-10-nvidia-isaac',
        'weekly/weeks-11-12-humanoid-development',
        'weekly/week-13-conversational-robotics'
      ],
    },
    {
      type: 'category',
      label: 'Hardware Requirements',
      items: [
        'hardware/workstation-requirements',
        'hardware/edge-kit',
        'hardware/robot-options'
      ],
    },
    'assessments',
    'learning-outcomes',
    'why-physical-ai-matters'
  ],
};

export default sidebars;