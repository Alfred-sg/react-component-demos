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
}: InternalMiniMapProps, ref) => {
  const NodeRender = nodeRender;
  const viewportRef = useRef<any>(null);
  const { position, setPosition, onMouseDown, onMouseMove, onMouseUp } = useDrag({
    startPosition: positionProp,
    positionRule: {
      left: { min: 0, max: realWidth - viewportWidth, },
      top: { min: 0, max: realHeight - viewportHeight, },
    },
  });

  useEffect(() => {
    setPosition(positionProp)
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
      className="viewported-minimap"
      style={{
        width: `${realWidth}px`,
        height: `${realHeight}px`,
        ...style,
      }}
    >
      <div
        className="viewported-minimap-viewport"
        style={{
          width: `${viewportWidth}px`,
          height: `${viewportHeight}px`,
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
  )
};

export default MiniMap;