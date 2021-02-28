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

import VerifyCode from '../../VerifyCode';

export default {
  title: 'react-demos/verify-code',
  component: VerifyCode,
  argTypes: {
    code: { control: { type: 'text' }, description: '校验码' },
    onRefresh: { control: { type: 'function' }, description: '监听刷新事件' },
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      },
      page: () => (
        <>
          <Title>canvas 图片校验码</Title>
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
    <div style={{width: 400}}>
      <VerifyCode
        code={args.code}
      />
    </div>
  )
};

export const Generic = Template.bind({});
Generic.args = {
  code: "a23b",
};
Generic.storyName = 'generic';