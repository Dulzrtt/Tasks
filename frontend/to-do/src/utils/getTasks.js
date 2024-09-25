import api from "./api";
import { useState } from "react";


export default function GetTasks(){
    const [tasks, setTasks] = useState([]);
    api.get("/getAll").then((response) => {
        setTasks(response.data.message);
    })
    return tasks;
}
