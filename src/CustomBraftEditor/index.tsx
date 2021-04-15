import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import Heading from './Heading';
import Tree from './Tree';
import 'antd/dist/antd.css';
import './index.scss';

export default class BasicDemo extends React.Component {
  isLivinig: boolean;
  editor: BraftEditor;

  state = {
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
    outputHTML: '<p></p>'
  }

  applyControl = (command: string) => {
    const { editorState } = this.state;
    this.editor.setValue(ContentUtils.toggleSelectionBlockType(editorState, command));
  }

  componentDidMount () {
    this.isLivinig = true
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML(),
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
    })
  }

  render () {
    const { editorState, outputHTML } = this.state;

    return (
      <div>
        <div className="custom-braft-editor-wrapper">
          <div className="custom-braft-editor">
            <BraftEditor
              ref={(editor) => this.editor = editor}
              controls={[
                'undo', 'redo', 'separator',
                {
                  key: 'heading',
                  type: 'component',
                  component: <Heading editorState={editorState} applyControl={this.applyControl} />,
                }, 'separator', 
                'bold', 
              ]}
              value={editorState}
              onChange={this.handleChange}
            />
          </div>
          <div className="custom-braft-editor-category">
            <Tree editorState={editorState} />
          </div>
        </div>
        <h5>输出内容</h5>
        <div className="output-content" dangerouslySetInnerHTML={{__html: outputHTML}}></div>
      </div>
    )
  }
}