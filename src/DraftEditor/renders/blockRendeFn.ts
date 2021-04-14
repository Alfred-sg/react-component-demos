import Media from './Media';

export default (contentBlock) => {
  const type = contentBlock.getType();
  if (type === 'atomic') {
    return {
      component: Media,
      editable: false,
      props: {
        foo: 'bar',
      },
    };
  }
};