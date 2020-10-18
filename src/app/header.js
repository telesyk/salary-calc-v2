import createElement from "../helpers/createElement";

export default function Header() {
  const title = createElement("h1", {
    className: "title has-text-light",
    textContent: "Salary calc"
  });

  return title;
}
