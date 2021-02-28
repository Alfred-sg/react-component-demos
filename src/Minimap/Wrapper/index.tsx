import React from 'react';
import { useMiniMap } from '../context';
import './index.scss';

const Wrapper = ({
  useBodyScroll,
  children,
}: any) => {
  const minimap = useMiniMap({ useBodyScroll });

  return useBodyScroll ? (
    <div className="minmap-container">
      <div className="minmap-content" ref={minimap.sourceRef}>
        {children}
      </div>
    </div>
  ) : (
    <div className="minmap-scroll-container">
      <div className="minmap-scroll-content" ref={minimap.sourceRef}>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;