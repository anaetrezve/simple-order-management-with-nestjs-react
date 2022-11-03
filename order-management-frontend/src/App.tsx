import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/layout';
import routes from './layout/routes';

const Loading = () => <p>Loading ...</p>;

const App = () => (
  <Layout>
    <React.Suspense fallback={<Loading />}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </React.Suspense>
  </Layout>
);

export default App;
