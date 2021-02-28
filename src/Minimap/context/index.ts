import { useRef, createContext, useContext, useEffect, useState } from 'react';

interface MiniMapContext {
  source: HTMLElement;
  setSource: (source: HTMLElement) => void;
  sourceRef: any;
  useBodyScroll?: boolean;
  bodyScrollXY: {
    x: number; 
    y: number;
  };
};

type Options = { 
  useBodyScroll: boolean;
};

export const useMiniMap = (options?: Options): MiniMapContext => {
  const { useBodyScroll } = options || {} as Options;
  const useBodyScrollRef = useRef<{ useBodyScroll?: boolean }>({ useBodyScroll });
  const sourceRef = useRef<HTMLElement>(null);
  const [source, setSource] = useState(null);
  const [bodyScrollXY, setBodyScrollXY] = useState({x: 0, y: 0});

  useEffect(() => {
    if (useBodyScroll){
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };
  }, [useBodyScroll]);

  const handleScroll = () => {
    setBodyScrollXY({
      x: document.body.scrollLeft,
      y: document.body.scrollTop,
    });
  };

  useEffect(() => {
    console.log(123)
    setSource(sourceRef.current);
  }, [sourceRef]);

  console.log('source', source)
  return {
    source,
    setSource,
    sourceRef,
    useBodyScroll: !useBodyScrollRef.current,
    bodyScrollXY,
  };
};

export const MiniMapContext = createContext<MiniMapContext>({} as MiniMapContext);

export const useMiniMapContext = (): MiniMapContext => {
  return useContext(MiniMapContext);
};