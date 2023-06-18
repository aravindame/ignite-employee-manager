"use client";

import { ReactNode, useEffect } from 'react';
import { ThemeProviderWrapper } from '@/themes/themeContext';
import '../styles/index.css';
import { Wrapper as ReduxProviderWrapper } from '@/redux/Wrapper';
import { SessionProvider } from "next-auth/react"
interface RootLayoutProps {
  children: ReactNode;
}

export const SessionProviderWrapper = ({ children }: RootLayoutProps) => {
  return (<ThemeProviderWrapper><SessionProvider >{children}</SessionProvider></ThemeProviderWrapper>);
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SessionProviderWrapper>
          <ReduxProviderWrapper>{children}</ReduxProviderWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
