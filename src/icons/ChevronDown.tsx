import { PureComponent } from "react";

class ChevronDown extends PureComponent {
  render() {
    return (
      <svg
        width="8"
        height="4"
        viewBox="0 0 8 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 0.5L4 3.5L7 0.5"
          stroke="black"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
}

export default ChevronDown;