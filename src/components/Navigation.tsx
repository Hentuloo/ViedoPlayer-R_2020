import React from 'react';
import { Link } from 'react-router-dom';

export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Watch vido</Link>
        </li>
        <li>
          <Link to="/editor">Edit video</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
