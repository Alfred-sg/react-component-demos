import React, { useEffect } from 'react';
import useDrag from '../hooks/useDrag';
import './index.scss';

type SliderProps = {
  onMove?: (moveXY: { x: number; y: number }) => void;
  left?: number;
};

const Slider = ({
  onMove,
  left = 0,
}: SliderProps) => {
  const { position, setPosition, onMouseDown, onMouseMove, onMouseUp } = useDrag({
    startPosition: {
      left,
      top: 0,
    },
    positionRule: {
      left: { min: 0, max: 100, },
      top: { min: 0, max: 0, },
    },
  });

  useEffect(() => {
    setPosition({
      left,
      top: 0,
    });
  }, [left]);

  const handleMouseMove = (event: any) => {
    const moveXY = onMouseMove(event);
    moveXY && onMove && onMove(moveXY);
  };

  return (
    <div 
      className="slider"
    >
      <div className="bar" /> 
      <i 
        className="icon"
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseUp={onMouseUp}
        onTouchEnd={onMouseUp}
        style={{
          left: position.left,
        }}
      />
    </div>
  );
}

export default Slider;
