import { useState, useCallback } from "react";
const browser = typeof window !=='undefined'; 


function useViewportWidth() {

    const[width, setWidth]= useState(browser ? window.innerWidth:0);
    const setSize = useCallback(()=>{
        setWidth(window.innerWidth || 0)
    },[]);

    window.addEventListener('resize', setSize, {passive:true});
    window.addEventListener('orientationChange',setSize, {passive:true});

    return width;
}

export default useViewportWidth;