import api from "../../utils/api"
import { useEffect, useState } from "react"
import TaskForm from "../form/TaskForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from "./AllTasks.module.css"


function AddTask(){
    const [toastValue, setToast] = useState([]);
    const success = () => toast.success("Task cadastrada com sucesso");
    const [toastMsg, setMsg] = useState([]);
    
    useEffect(() => {
        if (toastValue === 1) {
            toast.success(toastMsg);
            setToast(0);
        }else if(toastValue === 2){
            toast.error(toastMsg);
            setToast(0);
        }
      }, [toastValue]);
    
      return (
        <section className="">
            <h1>Add Task</h1>
            <TaskForm btnText="Create" setToast={setToast} setMsg={setMsg}></TaskForm>
            <ToastContainer></ToastContainer>
            
        </section>
    )
}

export default AddTask