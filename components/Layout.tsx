import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Brotherhood from './Brotherhood';
import Footer from './Footer';



interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    
      
      
      <div className="flex flex-col min-h-screen font-custom">
            
        <Navbar/>

        <div className="flex flex-col flex-grow z-1 ">
          {children}
        </div>
        
        <div className="flex-row bottom-0">
          <Footer />
        </div>

      </div>
    
  );
};

export default Layout;