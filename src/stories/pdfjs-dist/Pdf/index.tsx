import React, { Component } from 'react';
import * as pdfjs from 'pdfjs-dist/es5/build/pdf';
import workerSrc from 'pdfjs-dist/es5/build/pdf.worker.entry';
import Page from './Page';
import './index.scss';

pdfjs.workerSrc = workerSrc;

type PdfProps = {
  content?: string;
  file?: string;
  scale?: number;
  rotate?: number;
  onDocumentComplete?: (numPages: number) => void;
  style?: object;
};

const pixelRatio = window.devicePixelRatio || 1;

const MAX_IMAGE_SIZE = 1024 * 1024;
const CMAP_URL = "../../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

const getDocumentByUrl = (fileUrl: string) => {
  const loadingTask = pdfjs.getDocument({
    url: fileUrl,
    maxImageSize: MAX_IMAGE_SIZE,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
  });

  return loadingTask;
};

const getDocumentByByteArray = (byteArray: any) => {
  const loadingTask = pdfjs.getDocument(byteArray);

  return loadingTask;
};

class Pdf extends Component<PdfProps> {
  static defaultProps = { 
    scale: 1.0, 
    rotate: 0 
  };

  state: any = {};
  canvas: HTMLCanvasElement | null = null;
  pdfDocument: any | null = null;

  componentDidMount() {
    this.loadPDFDocument(this.props);
  }

  componentWillReceiveProps(newProps: PdfProps) {
    if ((newProps.file && newProps.file !== this.props.file) ||
      (newProps.content && newProps.content !== this.props.content)) {
      this.loadPDFDocument(newProps);
    }
  }

  onDocumentComplete = (pdfDocument: any) => {
    this.pdfDocument = pdfDocument
    this.setState({ pdf: pdfDocument });
    const { onDocumentComplete } = this.props;
    onDocumentComplete && onDocumentComplete(pdfDocument.numPages);
  }

  loadPDFDocument(props: any) {
    if (!!props.file) {
      if (typeof props.file === 'string') {
        return getDocumentByUrl(props.file)
          .promise
          .then(this.onDocumentComplete);
      }

      // Is a File object
      const reader = new FileReader();
      reader.onloadend = () => {
        return getDocumentByByteArray(new Uint8Array(reader.result));
      };
      reader.readAsArrayBuffer(props.file);

    } else if (!!props.content) {
      const bytes = window.atob(props.content);
      const byteLength = bytes.length;
      const byteArray = new Uint8Array(new ArrayBuffer(byteLength));
      for (let index = 0; index < byteLength; index++) {
        byteArray[index] = bytes.charCodeAt(index);
      }
      getDocumentByByteArray(byteArray);

    } else {
      throw new Error('React-PDFjs works with a file(URL) or (base64)content. At least one needs to be provided!');
    }
  }

  render() {
    const { pdf } = this.state;
    const { style, scale, rotate } = this.props;

    return pdf ? (
      <div 
        className="react-pdf" 
        style={style} 
      >
        {Array.from(new Array(4), (el, index) => {
          const currentPage = index + 1;

          return (
            <Page 
              key={index} 
              pdf={pdf} 
              pageNum={currentPage} 
              scale={scale}
              rotate={rotate}
            />
          );
        })}
      </div>
    ) : <div className="react-pdf-loading">PDF 文件加载中...</div>;
  }
}

export default Pdf;