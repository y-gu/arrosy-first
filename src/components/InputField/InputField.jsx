import React from "react";
import './InputField.scss';


export default function InputField({
  children,
  name,
  required = true,
  color
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}  style={{color:color}}>{children}</label>

      <input
        type="text"
        name={name}
        className="form-control"
        required={required}
      /> 
    </div>
  );
}



// import React from "react";
// import { forwardRef, useRef, useImperativeHandle } from "react";
// import './InputField.scss';

//  function InputField( props, ref) {
//   const inputRef = useRef();
//   useImperativeHandle(ref, () => ({
//     focus: () => {
//       inputRef.current.focus();
//     }
//   }));
//   return (
//     <div className="form-group">
//       <label htmlFor={props.name}  style={{color:props.color}}>{props.children}</label>
//       <input
//         ref={inputRef}
//         type="text"
//         name={props.name}
//         className="form-control"
//         required={true}
//       /> 
//     </div>
//   );
// }
// InputField = forwardRef(InputField);
// export default InputField;