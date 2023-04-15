import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import View1 from "../pages/View1";
import View2 from "../pages/View2";
import CustomView from "../pages/CustomView";
import ShowCustomView from "../pages/ShowCustomView";

function Viewlinks({route}) {
    const [rview, setView ] = useState(route);

    const changeView = (e) => {
        window.history.pushState(null, "", `/home/${e.target.value}`);
        setView(e.target.value);
    };
    
    useEffect(() => {
      const handlePopState = () => {
        setView(0);
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }, []);

    const goBack = () => {
      window.history.pushState(null, "", "/home");
      setView(0);
    };
    
        switch (rview) {
          case "View1":
            return <View1 goBack={goBack}/>;
          case "View2":
            return <View2 goBack={goBack}/>;
          case "CustomView":
            return <CustomView goBack={goBack}/>;
          case "ShowCustom":
            return <ShowCustomView goBack={goBack}/>;
          default:
            return (
                <>
                    <button value={"View1"} onClick={e => changeView(e)}>View 1</button>
                    <button value={"View2"} onClick={e => changeView(e)}>View 2</button>
                    <button value={"CustomView"} onClick={e => changeView(e)}>Custom View</button>
                    <button value={"ShowCustom"} onClick={e => changeView(e)}>Show Custom View</button>
                </>
            );
        }
}
export default Viewlinks;