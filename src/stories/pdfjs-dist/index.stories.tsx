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

import Pdf from '../../Pdf';
import sample from './sample.pdf';

export default {
  title: 'react-demos/pdfjs-dist',
  component: Pdf,
  argTypes: {
    file: { control: { type: 'text' }, description: 'pdf 文件地址或内容' },
    scale: { control: { type: 'text' }, description: '缩放' },
    rotate: { control: { type: 'text' }, description: '旋转' },
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      },
      page: () => (
        <>
          <Title>pdf 浏览</Title>
          <Subtitle />
          <Description />
          <div>
            基于 
            <a href="https://github.com/wojtekmaj/react-pdf" target="_blank">
              pdfjs-dist
            </a> 
            渲染 pdf 文件。
            
            在不支持 Promise、ReadableStream 的浏览器中，需要使用降级 es5 版本。本例即用此。
          </div>
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
    <div className='document'>
      <Pdf
        file={args.file}
        page={1}
      />
    </div>
  )
};

export const Generic = Template.bind({});
Generic.args = {
  file: sample,
};
Generic.storyName = 'generic';