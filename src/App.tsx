/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// data mode
// import { RouterProvider } from 'react-router';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AppRoutes } from './config/Routes';
import { AuthContextProvider } from './context/AuthContext';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';
import { AppContentStyle } from './App.style';
import { PageNotFound } from './pages/PageNotFound';
import { DebugProvider } from './context/DebugContext';

// create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TopBar />
      <div css={AppContentStyle} data-testid="demo">
        <BrowserRouter>
          <AuthContextProvider>
            <SideBar />
            <DebugProvider>
              <Routes>
                {AppRoutes.map((e) => {
                  return <Route path={e.path} key={e.path} element={e.element} />;
                })}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </DebugProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
