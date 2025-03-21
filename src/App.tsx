/** @jsxImportSource @emotion/react */
import * as React from 'react';
// data mode
// import { RouterProvider } from 'react-router';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AppRoutes } from './config/Routes';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';
import { AppContentStyle } from './App.style';
import { PageNotFound } from './pages/PageNotFound';

const App = () => {
  return (
    <React.Fragment>
      <TopBar />
      <div css={AppContentStyle} data-testid="demo">
        <SideBar />
        <BrowserRouter>
          <Routes>
            {AppRoutes.map((e) => {
              return <Route path={e.path} element={e.element} />;
            })}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
};

export default App;
