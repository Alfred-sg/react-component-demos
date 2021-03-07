import React, { useEffect, useRef } from 'react';
import { useMiniMapContext } from '../context';
import './index.scss';

const Wrapper = ({
  useBodyScroll,
  children,
}: any) => {
  const sourceRef = useRef<HTMLElement>(null);
  const minimap = useMiniMapContext();

  useEffect(() => {
    if (sourceRef.current){
      minimap.subsciber.source = sourceRef.current;
      console.log(minimap.subsciber)
      minimap.subsciber.notify();
    }
  }, [sourceRef]);

  return useBodyScroll ? (
    <div className="minmap-container">
      <div className="minmap-source minmap-content" ref={sourceRef}>
        {children}
      </div>
    </div>
  ) : (
    <div className="minmap-scroll-container">
      <div className="minmap-source minmap-scroll-content" ref={sourceRef}>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;