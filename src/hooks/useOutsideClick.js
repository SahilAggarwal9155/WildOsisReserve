import { useEffect, useRef } from "react";


export default function useOutsideClick(handler, listenCapturing = true) {
   //   Why use useRef?
   // To check if a click occurred outside the modal (!ref.current.contains(e.target)).
   // useRef persists across renders and does not trigger re-renders when updated.
   
     const ref = useRef();
   
     useEffect(function(){
       function handleClick(e){
       if(ref.current && !ref.current.contains(e.target)){
         console.log("clicked outside")
           handler();
       }
      }
       document.addEventListener('click',handleClick,listenCapturing);
   
       return ()=>document.removeEventListener("click",handleClick,listenCapturing);
     },[handler,listenCapturing])

     return ref;
}
