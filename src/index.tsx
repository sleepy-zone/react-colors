import * as React from 'react';
import styles from './index.module.css';

interface ComponentProps {
  /** Title for ReactColors. */
  title: string;
}

export default function ReactColors(props: ComponentProps) {
  const { title = 'Hello World!' } = props;

  return (
    <div className={styles.ReactColors}>{title}</div>
  );
}
