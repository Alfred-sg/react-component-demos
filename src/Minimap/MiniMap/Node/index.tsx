import React from 'react';
import { MiniMapNodeProps } from '../types';
import './index.scss';

export default ({
  width, 
  height, 
  left, 
  top,
}: MiniMapNodeProps) => {
  const style = {
    width,
    height,
    left,
    top,
  };

  return (
    <div 
      className="minimap-node" 
      style={style} 
    />
  );
};