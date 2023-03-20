import React, { ReactNode } from 'react';
import Meta from './Meta';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-2 sm:py-2 md:py-4 lg:py-10">
        <Meta />
        {children}
        <div className="px-2 sm:py-2 md:py-4 lg:px-10 sm:px-2 md:px-4"></div>
      </div>
    </div>
  );
}
