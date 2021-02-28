import React, { useState, useEffect } from 'react';
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

import MiniMap, { MiniMapContext, useMiniMap, Wrapper, MiniMapContextWrapper } from '../../Minimap';
import { Yellow, Red, Dark } from './Block';
import './index.scss';

export default {
  title: 'react-demos/minimap',
  component: MiniMap,
  argTypes: {
    code: { control: { type: 'text' }, description: '校验码' },
    onRefresh: { control: { type: 'function' }, description: '监听刷新事件' },
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      },
      page: () => (
        <>
          <Title>dom 缩略图</Title>
          <Subtitle />
          <Description />
          <Primary />
          {/* ArgsTable 参数列表 */}
          <ArgsTable story={PRIMARY_STORY} />
          {/* <Stories includePrimary /> */}
        </>
      ),
    },
  },
} as Meta;

const Template: Story<any> = (args) => {
  const [state, setState] = useState({
    random1: {left: 10, top: 10},
    random2: {left: 1000, top: 100},
    random3: {left: 350, top: 50},
  });

  const random = (max) => {
    return Math.round(Math.random() * max)
  };

  useEffect(() => {
    setInterval(() => {
      setState({
        random1: {left: random(3000), top: random(100)},
        random2: {left: random(3000), top: random(100)},
        random3: {left: random(3000), top: random(100)},
      })
    }, 2000)
  }, []);

  return (
    <MiniMapContextWrapper>
      <MiniMap
        selector=".box"
      />
      <Wrapper>
      <Dark />
        <Yellow className="pos-rlt" style={state.random1}/>
        <Red className="pos-rlt" style={{width: "200px", left: '4000px', top: '100px'}}/>
        <Yellow className="pos-rlt" style={state.random2} />
        <Dark className="pos-rlt" style={state.random3} />
        <Yellow className="pos-rlt" style={{width: "200px", left: '2000px'}} />
        <Dark className="pos-rlt" style={{width: "200px", left: '2000px', marginTop: "30px" }}/>

        <Yellow />
        <Dark />
        <Yellow />
      </Wrapper>
    </MiniMapContextWrapper>
  )
};

export const Generic = Template.bind({});
Generic.args = {
  code: "a23b",
};
Generic.storyName = 'generic';