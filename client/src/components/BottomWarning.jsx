import React from "react"; // Importing React library

import { Link } from "react-router-dom";



export default function BottomWarning({ label , to ,Bottomtext}){

          
    return(
        <>
          <div className="flex mt-5"> 
            <h3 className="text-gray-300">{label}</h3>
            <Link className="" to={to} ><span>_</span>{Bottomtext}</Link>
        </div>
        </>
    )

}