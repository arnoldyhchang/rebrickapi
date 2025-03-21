import * as React from 'react';
import { createBrowserRouter } from 'react-router';
import { Color } from '../pages/Color';
import { Dummy } from '../pages/Dummy';

// for data mode routing
export const Router = createBrowserRouter([
  {
    path: '/',
    Component: Color,
  },
  {
    path: '/dummy',
    Component: Dummy,
  },
]);

export interface AppRouteItem {
  path: string;
  element: React.ReactNode;
}

export const AppRoutes: AppRouteItem[] = [
  {
    path: '/',
    element: <Color />,
  },
  {
    path: '/color',
    element: <Color />,
  },
  {
    path: '/dummy',
    element: <Dummy />,
  },
];
