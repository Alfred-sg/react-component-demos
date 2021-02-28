import React from 'react';
import OverflowedMiniMap from './OverflowedMiniMap';
import ViewportedMiniMap from './ViewportedMiniMap';
import { InternalMiniMapProps } from './types';

const InternalMiniMap = ({
  type = 'overflowed',
  ...rest
}: InternalMiniMapProps) => {
  return type === 'overflowed' ? (
    <OverflowedMiniMap {...rest} />
  ) : type === 'viewported' ? (
    <ViewportedMiniMap {...rest} />
  ) : null
};

export default InternalMiniMap;