import React from 'react';
import { Editor, EditorState } from 'draft-js';
import blockRenderMap from './renders/blockRenderMap';
import blockRendeFn from './renders/blockRendeFn';
import 'draft-js/dist/Draft.css';

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
    />
  );
}

export default MyEditor;