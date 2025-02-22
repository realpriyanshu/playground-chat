
import React from "react" 


export default function Inputbox({ label, placeholder, onchange }) {
  return (
    <div className="flex justify-between pt-5">
      <div className="text-lg">{label}</div>
      <div>
        
        <input type="text" className="border-1  bg-transparent   p-2 rounded-md outline-none text-white border-black  text-center" placeholder={placeholder} onChange={onchange} />
      </div>
    </div>
  );
}