import {useState, useEffect} from "react";
import React from "react";
import api from "../utils/api";

export default function useTasks(){
    const [tasks, setTasks] = useState([]);
    
    React.useEffect(() =>{
    api.get("/getAll").then((response) => {
        setTasks(response.data.message);
      })
    }, []) 

    return tasks;
}

