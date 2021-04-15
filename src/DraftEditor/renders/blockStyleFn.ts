export default (customBlockStyleFn) => (block) => {
  const blockAlignment = block.getData() && block.getData().get('textAlign');

  let result = '';

  if (blockAlignment) {
    result = `bfa-${blockAlignment}`;
  }

  return result;
};
