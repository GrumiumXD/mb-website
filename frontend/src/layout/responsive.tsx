import React, { PropsWithChildren } from 'react';

import { useMediaQuery } from 'react-responsive';

export const TabletThreshold = 768;
export const DesktopSThreshold = 1024;
export const DesktopMThreshold = 1280;
export const DesktopLThreshold = 1600;

export const Tablet: React.FC<PropsWithChildren> = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: TabletThreshold });
  return isDesktop ? (children as JSX.Element) : null;
};

export const Mobile: React.FC<PropsWithChildren> = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: TabletThreshold - 1 });
  return isMobile ? (children as JSX.Element) : null;
};
