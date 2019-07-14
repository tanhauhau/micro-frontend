import React from 'react';
import { Link } from 'react-router-dom';
export default function PageHome() {
  return (
    <>
      <h1>Home Page.</h1>
      <h2>
        Browse <Link to="/foods">List of Foods</Link>
      </h2>
    </>
  );
}
