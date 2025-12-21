/**
 * Root Layout Component
 * Integrates the sticky chatbot into the Docusaurus site
 * 
 * Add this to your main layout to display chatbot on all pages
 */

import React from 'react';
import type { ReactNode } from 'react';
import StickyCharbot from './StickyCharbot';

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Root layout wrapper that includes the sticky chatbot
 * Place this as a wrapper around your main content
 */
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <StickyCharbot />
    </>
  );
};

export default RootLayout;
