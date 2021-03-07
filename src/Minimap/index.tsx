export { default as default } from './MiniMap';
export { MiniMapContext as MiniMapContext, Subscriber } from './context';
export { useMiniMap as useMiniMap } from './context';
export { default as Wrapper } from './Wrapper';
import { MiniMapContext, useMiniMap, Subscriber } from './context';

export const MiniMapContextWrapper = ({
  useBodyScroll,
  children,
}: {
  useBodyScroll?: boolean;
  children: React.ReactNode;
}) => {
  const minimap = useMiniMap({
    useBodyScroll,
    subsciber: new Subscriber(),
  });

  return (
    <MiniMapContext.Provider value={minimap}>
      {children}
    </MiniMapContext.Provider>
  );
};