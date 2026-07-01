import {createContext,useEffect,useState} from "react";

import {getDashboard} from "../services/dashboardApi";

export const DashboardContext=createContext();

export default function DashboardProvider({children}){

const[data,setData]=useState({});

useEffect(()=>{

getDashboard().then(setData);

},[]);

return(

<DashboardContext.Provider
value={data}
>

{children}

</DashboardContext.Provider>

);

}