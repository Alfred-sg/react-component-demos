import React, { useState, useEffect, Fragment } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  Title,
  Subtitle,
  Description,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
  Primary,
} from '@storybook/addon-docs/blocks';

import Editor from './Editor';

export default {
  title: 'react-demos/draft-js',
  component: Editor,
  argTypes: {
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      },
      page: () => (
        <>
          <Title>draft-js 富文本编辑器</Title>
          <Subtitle />
          <Description>
            draft-js 表现与 input 受控组件相似。
            editorState 控制值（实际为内部状态的快照），onChange 监听变更
            当编辑器内容变更时，draft-js 会创建新的 editorState 对象
            内容变更（包含文本选中内容变更）都可以通过 onChange 监听
          </Description>
          <Primary />
          {/* ArgsTable 参数列表 */}
          <ArgsTable story={PRIMARY_STORY} />
          {/* <Stories includePrimary /> */}
        </>
      ),
    },
  },
} as Meta;

const Template: Story<any> = (args) => {
  return (
    <Editor />
  )
};

export const Generic = Template.bind({});
Generic.args = {
};
Generic.storyName = 'generic';