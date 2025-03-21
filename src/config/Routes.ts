import { createBrowserRouter } from 'react-router';
import { Color } from '../pages/Color';
import { Dummy, Dummy2 } from '../pages/Dummy';

export const Router = createBrowserRouter([
  {
    path: '/',
    Component: Color, 
  },
  {
    path: '/dummy',
    Component: Dummy,
  },
  {
    path: '/dummy2',
    Component: Dummy2,
  }
]);
