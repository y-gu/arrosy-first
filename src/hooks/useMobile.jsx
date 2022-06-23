import useViewportWidth from './useViewportWidth';
import { useState, useEffect} from "react";

function useMobile() {
    const phoneWidth = 576;
    const width = useViewportWidth();
    const [mobile, setMobile] = useState(width >= phoneWidth ? false : true);
    useEffect(() => {
        width >= phoneWidth ? setMobile(false) : setMobile(true);
      }, [width]);
      return mobile
}

export default useMobile