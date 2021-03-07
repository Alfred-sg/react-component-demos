import { useRef, createContext, useContext, useEffect, useState } from 'react';

interface MiniMapContext {
  useBodyScroll?: boolean;
  bodyScrollXY: {
    x: number; 
    y: number;
  };
  subsciber: Subscriber;
};

type Options = { 
  useBodyScroll: boolean;
  subsciber: Subscriber;
};

export class Subscriber {
  source: HTMLElement | undefined;
  subscibers: ((source: HTMLElement) => any)[] = [];

  subscribe = (subsciber: (source: HTMLElement) => any) => {
    this.subscibers.push(subsciber);

    return () => {
      this.removeSubscriber(subsciber);
    };
  };

  removeSubscriber = (subsciber: (source: HTMLElement) => any) => {
    this.subscibers = this.subscibers.filter(cb => subsciber != cb);
  }; 

  notify = () => {
    if (this.source){
      this.subscibers.map(subsciber => {
        subsciber(this.source);
      });
    }
  }
}

export const useMiniMap = (options?: Options): MiniMapContext => {
  const { useBodyScroll, subsciber } = options || {} as Options;
  const useBodyScrollRef = useRef<boolean>(!!useBodyScroll);
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

  return {
    useBodyScroll: !!useBodyScrollRef.current,
    bodyScrollXY,
    subsciber,
  };
};

export const MiniMapContext = createContext<MiniMapContext>({} as MiniMapContext);

export const useMiniMapContext = (): MiniMapContext => {
  return useContext(MiniMapContext);
};