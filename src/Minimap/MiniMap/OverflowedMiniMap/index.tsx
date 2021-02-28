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
}: InternalMiniMapProps) => {
  const NodeRender = nodeRender;
  const viewportRef = useRef<any>(null);
  const { position, setPosition, onMouseDown, onMouseMove, onMouseUp } = useDrag({
    startPosition: positionProp,
    positionRule: {
      left: { min: viewportWidth - realWidth, max: 0 },
      top: { min: viewportHeight - realHeight, max: 0 },
    },
  });

  useEffect(() => {
    setPosition(positionProp)
  }, [positionProp]);

  const handleMouseDown = (event: any) => {
    if (!viewportRef.current) return;
    onMouseDown(event);
  };

  const handleMouseUp = () => {
    onMouseUp(event);
  };

  const handleMouseMove = (event: any) => {
    const moveXY = onMouseMove(event);
    console.log(moveXY)
    onMove && onMove(moveXY);
  };

  return (
    <div 
      className="overflowed-minimap-wrap"
      style={{
        width: `${viewportWidth}px`,
        height: `${viewportHeight}px`,
      }}
    >
      <div
        className="overflowed-minimap"
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
      >
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