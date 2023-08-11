import React, { ReactNode } from 'react';
import Navbar from './Navbar';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex justify-center flex-col flex-grow">{children}</main>
    </div>
  );
};

export default Layout;