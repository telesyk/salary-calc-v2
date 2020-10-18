export default function createElement(elementName, options) {
  if (!elementName) return;

  const element = document.createElement(elementName);

  options = options || {};

  if (!options.className) return;
  element.className = options.className;

  if (!options.textContent) return;
  element.textContent = options.textContent;

  return element;
}
