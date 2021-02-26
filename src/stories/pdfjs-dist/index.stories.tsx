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

import Pdf from './Pdf';
import sample from './sample.pdf';

export default {
  title: 'react-demos/pdfjs-dist',
  component: Pdf,
  argTypes: {
    file: { control: { type: 'text' }, description: 'pdf 文件地址或内容' },
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
              react-pdf
            </a> 
            渲染 pdf 文件。
            
            react-pdf 会将 pdf 内容渲染成 canvas 或 svg，图层之上再辅以 text 文本内容，以便选择。
            通过设置 Page 组件的 renderTextLayer 为 false，可以关闭文本的渲染。
          </div>
          <ul>
            <li>pdf 展示</li>
            <li>分页</li>
            <li>未调试：内部链接</li>
            <li>未实现：下载</li>
            <li>未实现：标注</li>
          </ul>
          <Primary />
          {/* ArgsTable 参数列表 */}
          <ArgsTable story={PRIMARY_STORY} />
          {/* <Stories includePrimary /> */}
        </>
      ),
    },
  },
} as Meta;

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

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
  showPagination: true,
};
Generic.storyName = 'generic';