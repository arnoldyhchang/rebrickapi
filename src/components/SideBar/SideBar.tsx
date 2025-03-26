/** @jsxImportSource @emotion/react */
import React from 'react';
import { useLocation, NavLink } from 'react-router';
import { SideBarStyle, SideBarMenuItem, SideBarMenuItemActive, SideBarContainerStyle } from './SideBar.style';
import { AppRoutes } from '../../config/Routes';

export const SideBar: React.FC = () => {
  const location = useLocation();
  const sidebarRoutes = AppRoutes.filter((e) => e.sidebar);
  return (
    <div css={SideBarStyle}>
      <div css={SideBarContainerStyle}>
        {sidebarRoutes.map((e) => (
          <NavLink
            key={e.path}
            to={e.path}
            css={e.path !== location.pathname ? SideBarMenuItem : [SideBarMenuItem, SideBarMenuItemActive]}
          >
            {e.path}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
