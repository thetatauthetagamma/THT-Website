import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Brotherhood from './Brotherhood';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    
    <div className="flex flex-col min-h-screen">
      <div className="flex-row">
        <Navbar />
      </div>
      <div className="flex flex-col flex-grow">{children}</div>
    </div>
  );
};

export default Layout;