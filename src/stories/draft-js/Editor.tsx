import React from 'react';
import { Editor, EditorState, DefaultDraftBlockRenderMap } from 'draft-js';
import Immutable from 'immutable';
import 'draft-js/dist/Draft.css';

const blockRenderMap = DefaultDraftBlockRenderMap.merge(Immutable.Map({
  'unstyled': {
    element: 'div',
    aliasedElements: ['p'],
  }
}));

class MediaComponent extends React.Component<any> {
  render() {
    const {block, contentState} = this.props;
    const {foo} = this.props.blockProps;
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    // Return a <figure> or some other content using this data.
    return (
      <></>
    )
  }
}

const blockRendeFn = (contentBlock) => {
  const type = contentBlock.getType();
  if (type === 'atomic') {
    return {
      component: MediaComponent,
      editable: false,
      props: {
        foo: 'bar',
      },
    };
  }
};

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