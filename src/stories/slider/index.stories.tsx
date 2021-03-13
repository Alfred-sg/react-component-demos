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

import Slider from '../../Slider';

export default {
  title: 'react-demos/slider',
  component: Slider,
  argTypes: {
    left: { control: { type: 'number' }, description: '位置' },
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
    <Slider
      left={args.left}
    />
  );
};

export const Generic = Template.bind({});
Generic.args = {
  left: 0,
};
Generic.storyName = 'generic';