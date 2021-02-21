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

import { DocumentProps, PageProps } from 'react-pdf';
import { Document, Page, Outline } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './index.scss';
import sample from './sample.pdf';

interface PdfProps extends DocumentProps {
  showOutline?: boolean;
  showPagination?: boolean;
}

export default {
  title: 'react-demos/pdf-viewer',
  component: Document,
  argTypes: {
    file: { control: { type: 'text' }, description: 'pdf 文件地址或内容' },
    showPagination: { control: { type: 'boolean' }, description: '是否分页' },
    showOutline: { control: { type: 'boolean' }, description: '是否显示章节' },
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

const Template: Story<PdfProps> = (args) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  if (args.showPagination){
    return (
      <div className='document'>
        <Document
          file={args.file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {!!args.showOutline && <Outline />}

          <Page
            pageNumber={currentPage}
          />
        </Document>

        {numPages && (
          <div className="page-controls">
            <button 
              disabled={currentPage == 1} 
              type="button" 
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ‹
            </button>
            <span>{currentPage} of {numPages}</span>
            <button 
              disabled={currentPage == numPages} 
              type="button" 
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              ›
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='document'>
      <Document
        file={args.file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        {!!args.showOutline && <Outline />}

        <Fragment>
          {Array.from(
            new Array(numPages),
            (el, index) => currentPage == index + 1 ? (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            ) : null,
          )}
        </Fragment>
      </Document>
    </div>
  )
};

export const Generic = Template.bind({});
Generic.args = {
  file: sample,
  showPagination: true,
};
Generic.storyName = 'generic';