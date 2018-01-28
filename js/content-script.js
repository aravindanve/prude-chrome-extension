/**
 * prude-chrome-extension
 * http://github.com/aravindanve
 **/

const PRUDE_OBJECT_NAME = '__prude';

function executeInPageContext(fn, ...args) {
  let fnString = fn.toString();
  let argsJSON = JSON.stringify(args);
  let scriptText = `(${fnString}).apply(window, ${argsJSON});`;
  var script = document.createElement('script');

  script.innerText = scriptText;
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}

executeInPageContext((prudeObjectName) => {
  window[prudeObjectName] = window[prudeObjectName] || {};

  let prudeObj = window[prudeObjectName];

  prudeObj.realOpen = window.open;
  prudeObj.pseudoOpen = () => { console.log('Blocked a popup from opening!'); };

  window.open = prudeObj.pseudoOpen;

}, PRUDE_OBJECT_NAME);
