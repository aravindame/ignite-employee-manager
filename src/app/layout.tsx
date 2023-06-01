"use client"

import { ReactNode } from 'react';
import { ThemeProviderWrapper } from '@/themes/themeContext';
import '../styles/index.css';
import { Wrapper } from '@/redux/Wrapper';
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ThemeProviderWrapper>
          <Wrapper>{children}</Wrapper>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
