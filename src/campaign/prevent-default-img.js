(() => {
  const nodeTypeEnum = {
    TEXT_ELEMENT: 3,
    ELEMENT_NODE: 1,
    DOCUMENT_NODE: 9,
    DOCUMENT_FRAGMENT_NODE: 11,
    CDATA_SECTION_NODE: 4
  };

  const getTarget = (event) => {
    return event.target || event.srcElement;
  };
  
  const getValidTarget = (node) => {
    return node.nodeType === nodeTypeEnum.TEXT_ELEMENT ?
      node.parentNode :
      node.nodeType === nodeTypeEnum.CDATA_SECTION_NODE ? null : node.correspondingUseElement ? node.correspondingUseElement : node;
  };

  const handleImgClick = (event) => {
    let node = getTarget(event);
    node = getValidTarget(node);

    if (node.tagName.toLowerCase() === 'img') {
      event.preventDefault();
    }
  };

  document.addEventListener('click', handleImgClick, true);
  document.addEventListener('touchstart', handleImgClick, true);
})();
