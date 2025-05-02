import styles from "./App.module.css";
import { useEffect, useState } from "react";

/* useEffect(code_you_want_to_run, dependency) allows us to choose when should run the code,
    dependency means things react js should watch,
    run this code at the first time and when the dependency changes*/
function Hello(){
  useEffect(() => {
    console.log("created:)");
    return () => console.log("destroyed:(");
  },[]);
  /*when the component disappear, people can do something.
  this is cleanup function.
  if React mounts component, React runs the useEffect callback,
  but if React unmounts component, React then automatically runs the cleanup function you returned in useEffect.
  */
  return <h1>Hello</h1>;
}
/*Component means function that returns jsx*/

function App() {
    const [showing, setShowing] = useState(false);
    const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing? "Hide" : "Show"}</button>
    </div>
  );
}
/* 'function name(){}' == '() => {}' */

export default App;
