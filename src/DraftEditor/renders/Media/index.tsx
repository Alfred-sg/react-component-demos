import React from 'react';
import ReactPlayer from 'react-player';

const Media = ({
  url,
}) => {
  return (
    <ReactPlayer url={url} />
  )
};

export default Media;