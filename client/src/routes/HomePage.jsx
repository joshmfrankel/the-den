import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function HomePage() {

  return (
    <>
      <h1>Home</h1>
      <nav>
        <Link to={`boards`}>Boards</Link>
        <Link to={`tasks`}>Tasks</Link>
      </nav>
    </>
  );
}
