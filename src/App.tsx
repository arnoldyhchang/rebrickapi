/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { RouterProvider } from 'react-router';
import { Router } from './config/Routes';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';
import { AppContentStyle } from './App.style';

const App = () => {
  return (
    <React.Fragment>
      <TopBar />
      <div css={AppContentStyle} data-testid="demo">
        <SideBar />
        <RouterProvider router={Router} />
      </div>
    </React.Fragment>
  );
};

export default App;
