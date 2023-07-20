import { useState } from "react";

import Popup from "./components/Popup";
import Chatbutton from "./components/Chatbutton";

function App() {
  const [toggle, setToggle] = useState(false);

  const clickHandler = () => {
    setToggle((prevState) => !prevState);
  };

  return (
    <div className="App">
      <Popup isVisible={toggle} />
      <Chatbutton onClick={clickHandler} isToggled={toggle} />
    </div>
  );
}

export default App;
