export { default as default } from './MiniMap';
export { MiniMapContext as MiniMapContext } from './context';
export { useMiniMap as useMiniMap } from './context';
export { default as Wrapper } from './Wrapper';
import { MiniMapContext, useMiniMap } from './context';

export const MiniMapContextWrapper = ({
  useBodyScroll,
  children,
}: any) => {
  const minimap = useMiniMap({
    useBodyScroll,
  });

  return (
    <MiniMapContext.Provider value={minimap}>
      {children}
    </MiniMapContext.Provider>
  );
};