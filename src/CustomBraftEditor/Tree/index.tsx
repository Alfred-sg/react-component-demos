import React, { useMemo } from 'react';
import { Menu, Tree } from 'antd';
import 'antd/dist/antd.css';
import './index.scss';

const Headings = ({
  editorState
}) => {
  const treeData = useMemo(() => {
    const { treeMap, currentContent } = editorState.toJS();
    const { blockMap } = currentContent;

    return Object.keys(treeMap).filter(key => {
      const block = blockMap[key];
      console.log(block);
      return ['header-one', 'header-two', 'header-three', 'header-fourth'].includes(block.type);
    }).map(key => {
      const block = blockMap[key];
      return {
        key,
        title: block.text,
      }
    });
  }, [editorState]);

  return (
    <div className="custom-braft-editor-tree">
      <div className="custom-braft-editor-tree-header">大纲</div>
      <Tree
        blockNode
        treeData={treeData}
      />
    </div>
  );
};

export default Headings;
