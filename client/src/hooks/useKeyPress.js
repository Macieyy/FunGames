import {useEffect} from "react";

const useKeyPress = (fn) =>{
    useEffect(()=>{
        window.addEventListener("keydown", fn);
        //zapobieganie utraty pamieci
        return () =>window.removeEventListener("keydown", fn);
    },[fn])
}

export default useKeyPress;