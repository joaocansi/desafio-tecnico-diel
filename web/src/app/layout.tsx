/* eslint-disable @typescript-eslint/no-unsafe-argument */
import './globals.css';

import type { Metadata } from 'next';
import { CssBaseline, colors } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Ꝏ.TAREFAS - Gere suas tarefas diarias!',
};

const error = console.error;
console.error = (...args: any) => {
  if (typeof args[0] === 'string' && args[0].includes('defaultProps')) return;
  error(...args);
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ background: colors.grey[100] }}>
        {children}
        <CssBaseline />
        <Toaster />
      </body>
    </html>
  );
}
