export default function Input(options) {
  // check options
  if (!options) return;
  // create field
  const field = document.createElement("div");
  field.className = "field";
  // create input
  const input = document.createElement("input");

  const customClassName = options.className || null;
  const inputType = options.type || "text";
  const inputName = options.name || options.id || "inputname";
  const inputId = options.id || options.name || "inputid";
  const title = options.title || options.name || "inputtitle";

  input.className = customClassName ? `input ${customClassName}` : "input";
  input.setAttribute("type", inputType);
  input.setAttribute("id", inputId);
  input.setAttribute("name", inputName);

  // label
  let label;

  if (!title || title === "") {
    field.appendChild(input);

    return field;
  } else {
    label = document.createElement("label");
    label.className = "label has-text-light";
    label.textContent = title;

    field.append(label, input);

    return field;
  }
}
