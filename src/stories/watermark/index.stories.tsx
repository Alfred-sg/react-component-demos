import React, { useState, Fragment } from 'react';
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

import Watermark from '../../Watermark';

export default {
  title: 'react-demos/watermark',
  component: Watermark,
  argTypes: {
    text: { control: { type: 'text' }, description: '文本内容' },
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      },
      page: () => (
        <>
          <Title>canvas 水印</Title>
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
    <Watermark
      text={args.text}
    />
  );
};

export const Generic = Template.bind({});
Generic.args = {
  text: '这是我要的水印效果',
  showPagination: true,
};
Generic.storyName = 'generic';