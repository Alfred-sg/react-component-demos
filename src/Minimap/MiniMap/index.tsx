import React, { useRef, forwardRef, useLayoutEffect, useState, useCallback, useMemo, useEffect } from 'react';
import InternalMiniMap from './InternalMiniMap';
import { useMiniMapContext } from '../context';
import { MiniMapProps, SourceData } from './types';
import { MiniMapNode } from './types';

const MiniMap = forwardRef(({
  source: sourceProp,
  useBodyScroll: useBodyScrollProp,
  selector,
  width = 200,
  height = 200,
  ...rest
}: MiniMapProps, ref) => {
  const minimap = useMiniMapContext();
  const source = useMemo(() => {
    console.log(324)
    return sourceProp || minimap.source;
  }, [sourceProp, minimap.sourceRef]);
  const useBodyScroll = useBodyScrollProp || minimap.useBodyScroll;
  console.log(source)

  useEffect(() => {
    console.log(3333,minimap.source)
  }, [minimap.source]);

  useEffect(() => {
    if (useBodyScroll){
      freshViewportPosition();
    };
  }, [useBodyScroll, minimap.bodyScrollXY]);

  const sourceDataRef = useRef<SourceData>({ 
    ratioX: 1, ratioY: 1, offsetX: 0, offsetY: 0,
  });
  const [nodes, setNodes] = useState<MiniMapNode[]>([]);
  const [realWidthHeight, setRealWidthHeight] = useState({ width, height });
  const [position, setPosition] = useState({ left: 0, top: 0, });

  React.useImperativeHandle(ref, () => ({
    freshViewportPosition,
    freshRectAndNodes,
  }));

  useLayoutEffect(() => {
    window.addEventListener('resize', freshRectAndNodes);

    return () => {
      window.removeEventListener('resize', freshRectAndNodes);
    };
  }, []);

  useLayoutEffect(() => {
    freshRectAndNodes();
  }, [source]);

  const freshRectAndNodes = () => {
    if (!source) return;

    requestAnimationFrame(() => {
      freshSourceData();
      freshRealWidthHeight();
      freshNodes();
    });
  };

  const freshSourceData = () => {
    let ratioX = 1;
    let ratioY = 1;
    let offsetX = 0;
    let offsetY = 0;

    const sourceRect = source.getBoundingClientRect();

    if (useBodyScroll){
      ratioX = window.screen.availWidth < sourceRect.width ? 
        window.screen.availWidth / sourceRect.width : 1;
      ratioY = window.screen.availHeight < sourceRect.height ? 
        window.screen.availHeight / sourceRect.height : 1;

      offsetX = document.body.scrollLeft - sourceRect.left;
      offsetY = document.body.scrollTop - sourceRect.top;
    } else {
      const parent = source && source.parentNode as HTMLElement;
      if (!source || !parent) return;
  
      const { scrollWidth, scrollHeight } = parent;
      const parentRect = parent.getBoundingClientRect();
      ratioX = parentRect.width < scrollWidth ? 
        scrollWidth / parentRect.width : 1;
      ratioY = parentRect.height < scrollHeight ? 
        scrollHeight / parentRect.height : 1;

      offsetX = source.scrollLeft - sourceRect.left;
      offsetY = source.scrollTop - sourceRect.top;
    };

    sourceDataRef.current = {
      ratioX,
      ratioY,
      offsetX,
      offsetY,
      width: sourceRect.width,
      height: sourceRect.height,
    };
  }

  const freshRealWidthHeight = useCallback(() => {
    const { ratioX, ratioY } = sourceDataRef.current;
    setRealWidthHeight({
      width: width * ratioX,
      height: height * ratioY,
    });
  }, [sourceDataRef]);

  const freshNodes = useCallback(() => {
    if (!source) return;

    const { ratioX, ratioY, offsetX, offsetY } = sourceDataRef.current;
    let nodes: MiniMapNode[] = [];
    
    source.querySelectorAll(selector).forEach((node: HTMLElement) => {
      const nodeRect = node.getBoundingClientRect();

      // 宽高为 1，以线渲染
      const wM = nodeRect.width == 1 ? nodeRect.width : nodeRect.width * ratioX;
      const hM = nodeRect.height == 1 ? nodeRect.height : nodeRect.height * ratioY;
      const xM = (nodeRect.left + offsetX) * ratioX;
      const yM = (nodeRect.top + offsetY) * ratioY;

      nodes.push({
        width: wM,
        height: hM,
        left: xM,
        top: yM,
        node: node,
      });
    });

    setNodes(nodes);
  }, [sourceDataRef]);

  const freshViewportPosition = () => {
    if (!source) return;

    freshSourceData();

    const { 
      offsetX, offsetY, 
      width: sourceWidth, height: sourceHeight 
    } = sourceDataRef.current;

    setPosition({
      left: - offsetX / sourceWidth * width,
      top: - offsetY / sourceHeight * height,
    });
  };

  const handleMove = ({ x, y }: { x: number; y: number; }) => {
    if (useBodyScroll){
      const { width, height, top, left } = source.getBoundingClientRect();
      window.scrollTo(
        x / width * width + left,
        y / height * height + top,
      );
    } else {
      const parent = source && source.parentNode as HTMLElement;
      if (!source || !parent) return;
      const rect = source.getBoundingClientRect();
      parent.scrollLeft = - x / width * rect.width;
      parent.scrollTop = - y / height * rect.height;
    };
  };

  return (
    <InternalMiniMap
      viewportWidth={width} 
      viewportHeight={height}
      realWidth={realWidthHeight.width}
      realHeight={realWidthHeight.height} 
      position={position}
      onMove={handleMove} 
      nodes={nodes} 
      {...rest}
    />
  )
});

export default MiniMap;