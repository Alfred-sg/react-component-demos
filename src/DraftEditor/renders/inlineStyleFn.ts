const getStyleValue = (style) => style.split('-')[1];

export default (styles, block) => {
  let output: any = {};
  
  styles.forEach((style) => {
    if (style.indexOf('COLOR-') === 0) {
      output.color = `#${getStyleValue(style)}`;
    }
  });

  return output;
};
