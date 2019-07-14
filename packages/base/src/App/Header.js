import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './Header.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <Link to="/">MicroFE</Link>
    </div>
  );
}
