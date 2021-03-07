import React, { useRef, useEffect } from 'react';
import Node from '../Node';
import useDrag from '../../../hooks/useDrag';
import { InternalMiniMapProps } from '../types';
import './index.scss';

const MiniMap = ({
  viewportWidth = 200,
  viewportHeight = 200,
  realWidth = 200,
  realHeight = 200,
  position: positionProp,
  onMove,
  nodes,
  nodeRender = Node,
  style,
}: InternalMiniMapProps) => {
  const NodeRender = nodeRender;
  const viewportRef = useRef<any>(null);
  const { position, setPosition, onMouseDown, onMouseMove, onMouseUp } = useDrag({
    startPosition: positionProp,
    positionRule: {
      left: { min: 0, max: viewportWidth - realWidth },
      top: { min: 0, max: viewportHeight - realHeight },
    },
  });

  useEffect(() => {
    console.log('positionProp', positionProp)
    setPosition({
      left: positionProp.left < viewportWidth - realWidth ? 
        positionProp.left : viewportWidth - realWidth,
      top: positionProp.top < viewportHeight - realHeight ? 
        positionProp.top : viewportHeight - realHeight,
    })
  }, [positionProp]);

  const handleMouseDown = (event: any) => {
    if (!viewportRef.current) return;
    onMouseDown(event);
  };

  const handleMouseUp = (event) => {
    onMouseUp(event);
  };

  const handleMouseMove = (event: any) => {
    const moveXY = onMouseMove(event);
    moveXY && onMove && onMove(moveXY);
  };

  return (
    <div 
      className="overflowed-minimap"
      style={{
        width: `${viewportWidth + 8}px`,
        height: `${viewportHeight + 8}px`,
        ...style,
      }}
    >
      <div 
        className="overflowed-minimap-content"
        style={{
          width: `${viewportWidth}px`,
          height: `${viewportHeight}px`,
        }}
      >
        <div
          className="overflowed-minimap-viewport"
          style={{
            width: `${realWidth}px`,
            height: `${realHeight}px`,
            ...position,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onMouseMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          onMouseUp={handleMouseUp}
          ref={viewportRef}
        />
        
        {(nodes || []).map((node, index) => {
          return (
            <NodeRender
              key={index}
              width={node.width}
              height={node.height}
              left={node.left}
              top={node.top}
              node={node.node}
            />
          )
        })}
      </div>
    </div>
  )
};

export default MiniMap;