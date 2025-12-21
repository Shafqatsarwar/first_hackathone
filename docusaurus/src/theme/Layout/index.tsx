import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import StickyCharbot from '../../components/StickyCharbot';

export default function LayoutWrapper(props) {
  return (
    <OriginalLayout {...props}>
      {props.children}
      <StickyCharbot />
    </OriginalLayout>
  );
}
