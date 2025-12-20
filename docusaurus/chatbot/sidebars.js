// Sidebar definition for the chatbot docs (modules + chapters)
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  chatbotSidebar: [
    'intro',
    'book-chapter',
    {
      type: 'category',
      label: 'Module Navigator',
      items: [
        'module1_ros/content',
        'module2_simulation/content',
        'module3_nvidia_isaac/content',
        'module4_vla/content',
      ],
    },
  ],
};

export default sidebars;
