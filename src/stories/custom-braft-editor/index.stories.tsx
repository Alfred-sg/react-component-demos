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

import Editor from '../../CustomBraftEditor';

export default {
  title: 'react-demos/custom-braft-editor',
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
          <Title>braft-editor 富文本编辑器</Title>
          <Subtitle />
          <Description />
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