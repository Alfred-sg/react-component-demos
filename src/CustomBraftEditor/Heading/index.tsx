import React, { Fragment } from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ContentUtils } from 'braft-utils';
import './index.scss';

const headings = [
  {
    key: 'unstyled',
    title: '正文',
    text: '正文',
    type: 'block-type',
    command: 'unstyled',
  },
  {
    key: 'header-one',
    title: '标题1',
    text: <h1>标题1</h1>,
    type: 'block-type',
    command: 'header-one',
  },
  {
    key: 'header-two',
    title: '标题2',
    text: <h2>标题2</h2>,
    type: 'block-type',
    command: 'header-two',
  },
  {
    key: 'header-three',
    title: '标题3',
    text: <h3>标题3</h3>,
    type: 'block-type',
    command: 'header-three',
  },
  {
    key: 'header-four',
    title: '标题4',
    text: <h4>标题4</h4>,
    type: 'block-type',
    command: 'header-four',
  },
]

const Headings = (props) => {
  const currentBlockType = ContentUtils.getSelectionBlockType(props.editorState);
  const currentHeadingIndex = headings.findIndex(
    (heading) => heading.command === currentBlockType,
  );
  const caption = headings[currentHeadingIndex]
    ? headings[currentHeadingIndex].title
    : headings[0].title;

  const menu = (
    <Menu>
      {headings.map(heading => {
        return (
          <Menu.Item 
            key={heading.key}
          >
            <div
              onClick={() => {
                props.applyControl(heading.command);
              }}
            >
              {heading.text}
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <span className="custom-braft-editor-control-btn">
        {caption}&nbsp;
        <DownOutlined />
      </span>
    </Dropdown>
  );
};

export default Headings;
