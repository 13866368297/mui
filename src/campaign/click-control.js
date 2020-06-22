const disableClick = (element) => {
  element.style.pointerEvents = 'none';
};

const enableClick = (element) => {
  element.style.pointerEvents = 'auto';
};

export {
  disableClick,
  enableClick
};
