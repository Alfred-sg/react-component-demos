import React from 'react';
import { Editor, EditorState } from 'draft-js';
import blockRenderMap from './renders/blockRenderMap';
import blockRendeFn from './renders/blockRendeFn';
import blockStyleFn from './renders/blockStyleFn';
import customStyleMap from './renders/inlineStyleMap';
import 'draft-js/dist/Draft.css';
import './index.scss';

function MyEditor() {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  return (
    <Editor
      editorState={editorState} 
      onChange={setEditorState} 
      blockRenderMap={blockRenderMap} 
      blockRendeFn={blockRendeFn} 
      blockStyleFn={blockStyleFn} 
      customStyleMap={customStyleMap}
      contentClassName="custom-draft-editor"
    />
  );
}

export default MyEditor;