export interface InternalMiniMapProps {
  type?: 'overflowed' | 'viewported';
  viewportWidth?: number /** in pixel */;
  viewportHeight?: number /** in pixel */;
  realWidth?: number /** in pixel */;
  realHeight?: number /** in pixel */;
  position?: { left: number; top: number };
  onMove?: (move: { x: number, y: number }) => void;
  nodes: MiniMapNode[];
  nodeRender?: React.FunctionComponent<MiniMapNodeProps> | React.ComponentClass<MiniMapNodeProps>;
};

export interface MiniMapProps {
  type?: 'overflowed' | 'viewported';
  source?: HTMLElement;
  selector: string;
  useBodyScroll?: boolean;
  width?: number /** in pixel */;
  height?: number /** in pixel */;
  onMove?: (move: { x: number, y: number }) => void;
  nodeRender?: React.FunctionComponent<MiniMapNodeProps> | React.ComponentClass<MiniMapNodeProps>;
};

export interface SourceData {
  ratioX: number; 
  ratioY: number; 
  offsetX: number; 
  offsetY: number; 
  width?: number; 
  height?: number; 
};

export interface MiniMapNodeProps {
  width: number;
  height: number;
  left: number;
  top: number;
  node: HTMLElement;
};

export interface MiniMapNode {
  width: number;
  height: number;
  left: number;
  top: number; 
  node: HTMLElement; 
};