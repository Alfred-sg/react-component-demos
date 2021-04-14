
import { DefaultDraftBlockRenderMap } from 'draft-js';
import Immutable from 'immutable';
import 'draft-js/dist/Draft.css';

const blockRenderMap = Immutable.Map({
  'unstyled': {
    element: 'div',
    aliasedElements: ['p'],
  }
});

export default DefaultDraftBlockRenderMap.merge(blockRenderMap);