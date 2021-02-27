import React, { Component } from 'react';
import styles from './index.scss';

type InternalPageProps = {
  page: any;
  scale?: number;
  rotate?: number;
  renderInteractiveForms?: boolean;
  onRenderSuccess?: (file: any) => any;
  onRenderError?: (file: any) => any;
};

const pixelRatio = window.devicePixelRatio || 1;

const makePageCallback = (page, scale) => {
  Object.defineProperty(page, 'width', { get() { return this.view[2] * scale; }, configurable: true });
  Object.defineProperty(page, 'height', { get() { return this.view[3] * scale; }, configurable: true });
  Object.defineProperty(page, 'originalWidth', { get() { return this.view[2]; }, configurable: true });
  Object.defineProperty(page, 'originalHeight', { get() { return this.view[3]; }, configurable: true });
  return page;
};

class InternalPage extends Component<InternalPageProps> {
  static defaultProps = { 
    scale: 1.0, 
    rotate: 0 
  };

  canvas: HTMLCanvasElement | null = null;
  renderer: any = null;

  componentDidMount() {
    this.drawPage();
  }

  componentDidUpdate(prevProps) {
    const { page, renderInteractiveForms } = this.props;
    if (
      page !== prevProps.page || 
      renderInteractiveForms !== prevProps.renderInteractiveForms
    ) {
      // Ensures the canvas will be re-rendered from scratch. Otherwise all form data will stay.
      page.cleanup();
      this.drawPage();
    }
  }

  componentWillUnmount() {
    if (this.renderer && this.renderer._internalRenderTask.running) {
      this.renderer._internalRenderTask.cancel();
    }

    /**
     * Zeroing the width and height cause most browsers to release graphics
     * resources immediately, which can greatly reduce memory consumption.
     */
    if (this.canvas) {
      this.canvas.width = 0;
      this.canvas.height = 0;
      this.canvas = null;
    }
  }

  /**
   * Called when a page is rendered successfully.
   */
  onRenderSuccess = () => {
    this.renderer = null;

    const { onRenderSuccess, page, scale } = this.props;

    if (onRenderSuccess) onRenderSuccess(makePageCallback(page, scale));
  }

  /**
   * Called when a page fails to render.
   */
  onRenderError = (error) => {
    if (error.name === 'RenderingCancelledException') {
      return;
    }

    const { onRenderError } = this.props;

    if (onRenderError) onRenderError(error);
  }

  drawPage() {
    const canvas = this.canvas;
    const { page, scale, rotate, renderInteractiveForms } = this.props;
    if (canvas && page) {
      const renderViewport = page.getViewport({ 
        scale: scale ? scale * pixelRatio : scale, 
        rotation: rotate 
      });

      const viewport = page.getViewport({
        scale: scale, 
        rotation: rotate,
      });

      canvas.height = renderViewport.height;
      canvas.width = renderViewport.width;

      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      this.renderer = page.render({ 
        canvasContext: canvas.getContext('2d'), 
        viewport: renderViewport,
        renderInteractiveForms,
      });

      return this.renderer.promise
        .then(this.onRenderSuccess)
        .catch(this.onRenderError);
    }
  }

  render() {
    return (
      <canvas 
        className={styles["react-pdf-page-canvas"]}
        dir="ltr"
        ref={(el: HTMLCanvasElement) => this.canvas = el} 
        style={{
          display: 'block',
          userSelect: 'none',
        }}
      />
    );
  }
};

type PageProps = {
  pdf: any;
  pageNum: number;
  scale?: number;
  rotate?: number;
  renderInteractiveForms?: boolean;
  onRenderSuccess?: (file: any) => any;
  onRenderError?: (file: any) => any;
};

class Page extends Component<PageProps> {
  state = {
    page: null,
  }

  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate(prevProps) {
    const { pdf, pageNum } = this.props;
    if (
      pdf !== prevProps.pdf || 
      pageNum !== prevProps.pageNum
    ) {
      this.loadPage();
    };
  }

  loadPage(){
    const { pdf, pageNum } = this.props;
    console.log(pdf)
    console.log(pageNum)
    pdf.getPage(pageNum).then(page => {
      this.setState({
        page,
      });
    });
  }

  render(){
    const { page } = this.state;
    const { pdf, pageNum, ...rest } = this.props;
    return (
      <InternalPage page={page} {...rest} />
    );
  }
}

export default Page;
