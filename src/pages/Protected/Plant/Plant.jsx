import React from 'react';
import { useParams} from "react-router-dom";

export default function Plant() {
let { id } = useParams();
  return (
    <div>Plant</div>
  )
}
