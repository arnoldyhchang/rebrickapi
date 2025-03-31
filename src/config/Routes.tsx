import * as React from 'react';
import { createBrowserRouter } from 'react-router';
import { Color } from '../pages/Color';
import { ColorByAxios } from '../pages/ColorByAxios';
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
  sidebar: boolean;
}

export const AppRoutes: AppRouteItem[] = [
  {
    path: '/',
    element: <Color />,
    sidebar: false,
  },
  {
    path: '/color',
    element: <Color />,
    sidebar: true,
  },
  {
    path: '/colorByAxios',
    element: <ColorByAxios />,
    sidebar: true,
  },
  {
    path: '/dummy',
    element: <Dummy />,
    sidebar: true,
  },
];
