import React, {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import Background from "./Background";

function App() {
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    console.log(event.key, event.metaKey, event.shiftKey);
      event.preventDefault()
  }, []);

  useEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);

    return () => document.body.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div>
      <Background />
    </div>
  );
}

export default App;
