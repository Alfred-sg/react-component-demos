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
  height = 120,
  ...rest
}: MiniMapProps, ref) => {
  const minimap = useMiniMapContext();
  const sourceRef = useRef<HTMLElement>(sourceProp);
  const useBodyScroll = useBodyScrollProp !== undefined ? 
    useBodyScrollProp : minimap.useBodyScroll;

  useEffect(() => {
    const removeSubscriber = minimap.subsciber.subscribe(() => {
      if (minimap.subsciber.source){
        sourceRef.current = minimap.subsciber.source;
        freshViewportPosition();
        freshRectAndNodes();
      };
    });
    minimap.subsciber.notify();

    return removeSubscriber;
  }, []);

  useEffect(() => {
    if (useBodyScroll){
      freshViewportPosition();
    };
  }, [useBodyScroll, minimap.bodyScrollXY]);

  const sourceDataRef = useRef<SourceData>({ 
    ratioX: 1, ratioY: 1, 
    viewportRatioX: 1, viewportRatioY: 1,
    offsetX: 0, offsetY: 0,
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
  }, [sourceRef]);

  const freshRectAndNodes = () => {
    if (!sourceRef.current) return;

    requestAnimationFrame(() => {
      freshSourceData();
      freshRealWidthHeight();
      freshNodes();
    });
  };

  const freshSourceData = () => {
    let ratioX = 1;
    let ratioY = 1;
    let viewportRatioX = 1;
    let viewportRatioY = 1;
    let offsetX = 0;
    let offsetY = 0;

    const sourceRect = sourceRef.current.getBoundingClientRect();

    if (useBodyScroll){
      ratioX = width < sourceRect.width ? 
        width / sourceRect.width : 1;
      ratioY = height < sourceRect.height ? 
        height / sourceRect.height : 1;
      viewportRatioX = window.screen.availWidth < sourceRect.width ? 
        window.screen.availWidth / sourceRect.width : 1;
      viewportRatioY = window.screen.availHeight < sourceRect.height ? 
        window.screen.availHeight / sourceRect.height : 1;

      offsetX = document.body.scrollLeft - sourceRect.left;
      offsetY = document.body.scrollTop - sourceRect.top;
    } else {
      const source = sourceRef.current;
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
      viewportRatioX,
      viewportRatioY,
      offsetX,
      offsetY,
      width: sourceRect.width,
      height: sourceRect.height,
    };
  }

  const freshRealWidthHeight = useCallback(() => {
    const { viewportRatioX, viewportRatioY } = sourceDataRef.current;
    setRealWidthHeight({
      width: width * viewportRatioX,
      height: height * viewportRatioY,
    });
  }, [sourceDataRef]);

  const freshNodes = useCallback(() => {
    if (!sourceRef.current) return;

    const { ratioX, ratioY, offsetX, offsetY } = sourceDataRef.current;
    let nodes: MiniMapNode[] = [];
    
    sourceRef.current.querySelectorAll(selector).forEach((node: HTMLElement) => {
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
    if (!sourceRef.current) return;

    freshSourceData();

    const { 
      offsetX, offsetY, 
      width: sourceWidth, height: sourceHeight 
    } = sourceDataRef.current;

    setPosition({
      left: offsetX / sourceWidth * width,
      top: offsetY / sourceHeight * height,
    });
  };

  const handleMove = ({ x, y }: { x: number; y: number; }) => {
    const source = sourceRef.current;
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
      style={useBodyScroll ? { position: 'fixed', top: 0, right: 0, zIndex: 222 } : {}}
      {...rest}
    />
  )
});

export default MiniMap;