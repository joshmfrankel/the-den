import React from 'react'
import { Link } from 'react-router-dom';

export default function HomePage() {
  const navigationLinks: [string, string][] = [['boards', 'Boards'], ['tasks', 'Tasks']];

  return (
    <>
      <h1>Home</h1>
      <nav>
        {navigationLinks.map((nav, index) =>
          <Link to={nav[0]} key={index}>{nav[1]}</Link>
        )}
      </nav>
    </>
  );
}
