/**
 * Listens for 'focus' event of the document (== when the pwa is opened) to look for an update of the sw
 * @param {*} reg The registration object
 */
const registerPwaOpeningHandler = (reg) => {
  let hidden;
  let visibilityChange;
  if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  window.document.addEventListener(visibilityChange, () => {
    if (!document[hidden]) {
      // manually force detection of a potential update when the pwa is opened
      reg.update();
    }
  });

  return reg;
};

export { registerPwaOpeningHandler };
