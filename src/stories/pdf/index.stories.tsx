import React, { useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { DocumentProps, PageProps } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './index.scss';
import sample from './sample.pdf';

export default {
  title: 'react-demos/pdf',
  component: Document,
  argTypes: {
    file: { control: 'text' },
  },
} as Meta;

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

const Template: Story<DocumentProps> = (args) => {
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  return (
    <div className='document'>
    <Document
      file={args.file}
      onLoadSuccess={onDocumentLoadSuccess}
      options={options}
    >
      {
        Array.from(
          new Array(numPages),
          (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
          ),
        )
      }
    </Document>
    </div>
  )
};

export const Generic = Template.bind({});
Generic.args = {
  file: sample,
};
