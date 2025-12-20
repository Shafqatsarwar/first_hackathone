import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Home() {
  return (
    <Layout
      title="Physical AI Textbook"
      description="Hands-on Physical AI learning with ROS 2, simulation, Isaac, and the chatbot."
    >
      <main className={styles.home}>
        <div className={styles.card}>
          <h1>Physical AI &amp; Humanoid Robotics Textbook</h1>
          <p>
            This portal collects the textbook chapters and the interactive chatbot modules.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/docs/intro">
              Browse the textbook
            </Link>
            <Link className={styles.secondary} to="/chatbot">
              Open the chatbot modules
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
