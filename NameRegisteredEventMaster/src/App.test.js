import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});
function Button(props) {
  const [text, setText] = useState("");
  function showNameRegisteredEvents() {
    setText("Empty List");
  }
  return <button onClick={showNameRegisteredEvents}>{text || props.text}</button>;
}


describe("Button component", () => {
  test("it shows the expected text when clicked", () => {
    act(() => {
      ReactDOM.render(<Button text="Filled List" />, container);
    });
    const button = container.getElementsByTagName("button")[0];
    expect(button.textContent).toBe("Filled List");
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(button.textContent).toBe("Empty List");
  });
});