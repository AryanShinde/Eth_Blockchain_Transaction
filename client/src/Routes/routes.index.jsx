import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

const Loadable = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <CircularProgress
          sx={{
            ...{
              width: 1,
              zIndex: 9999,
              position: 'fixed',
              top: '50vh',
              left: '50vw',
            },
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      //   children:[
      //     path:"/test",
      //     element:
      //   ]
    },
  ]);
}

//layouts
const MainLayout = Loadable(lazy(() => import('../layouts/MainLayout')));
