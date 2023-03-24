import React, { ReactNode } from 'react';
import Meta from './Meta';
import Header from '../../components/nav/HeaderNav';
import Footer from '../../components/nav/FooterNav';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Meta />
      <Header />
      <div className="mx-auto max-w-[1380px] px-2 sm:py-2 md:py-4 lg:py-10">
        <main className="container mx-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;