import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import VideoPage from './VideoPage';
import VideoEditor from './VideoEditor';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={VideoPage} />
          <Route path="/editor" component={VideoEditor} />
        </Switch>
      </div>
    </Router>
  );
}
