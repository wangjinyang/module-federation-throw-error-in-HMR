import React, { Suspense } from 'libs/react';
import { BrowserRouter as Router, Switch, Route, Link } from 'libs/react-router-dom';

const Button = React.lazy(() => import('remote/Button'));
// const lazyHeadIng = React.lazy(() => );
import('./lazyHeadIng')

const App = () => {
  return (
    <Router>
      <div>
        <div
          style={{
            margin: '10px',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: 'greenyellow',
          }}
        >
          <h1>HOST</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/button">Button</Link>
            </li>
          </ul>
        </nav>
        <Suspense fallback={'loading...'}>
          <Switch>
            <Route path="/button">
              <Button />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
