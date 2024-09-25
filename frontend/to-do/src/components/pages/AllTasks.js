import { useState } from "react"
import api from "../../utils/api"
import React from "react";
import TaskForm from "../form/TaskForm";
import modalStyle from "./Modal.module.css"
import Style from "./AllTasks.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

function AllTasks(){
    const [tasks, setTasks] = useState([]);
    const [modal, setModal] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    
    const [deleteModal, setDelete] = useState(false);
    const [deleteID, setDeleteID] = useState(null);
    
    function modalDelete(id){
        setDelete(true);
        setDeleteID(id);
    }

    function handleOk(id){
        setDeleteID(id);
        handleDelete();
    }
    
    async function handleDelete(){
        try{
            await api.delete("/delete", {data:{ id: deleteID}});
            setDelete(false);
            getTasks();
        }catch(err){
            console.log(err);
        }
       
    }

    function handleEdit(id){
        setModal(true);
        setEditingTaskId(id);   
    }
    function Modal(){
        setModal(false);
    }
    
    function getTasks(){
        api.get("/getAll").then((response) => {
            setTasks(response.data.message);
        })
    }
    
    React.useEffect(() =>{
        api.get("/getAll").then((response) => {
            setTasks(response.data.message);
          })
    }, [])
    
    
    const [toastValue, setToast] = useState([]);
    const success = () => toast.success("Task editada com sucesso");
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
        <section className={Style.all_section}>
            <h1>All tasks</h1>
            
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Desc</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            
                <tbody>
                    {tasks.length > 0 &&
                        tasks.map((task) =>(
                           <tr key={task._id} >
                                <td>{task.name}</td>
                                <td>{task.desc}</td>
                                <td>{task.date.split("T")[0]}</td>
                                <td>
                                    <span > <button className={Style.edit} onClick={() => handleEdit(task._id)}>edit</button> </span>
                                    <span > <button className={Style.done} onClick={() => handleOk(task._id)}>done</button> </span>
                                    <span > <button className={Style.delete} onClick={()=> modalDelete(task._id)}>exclude</button> </span>
                                    
                                    {modal && editingTaskId === task._id && (
                                    <div className={modalStyle.modal}>
                                        <div className={modalStyle.modal_content}>
                                        <span onClick={() => Modal()}className={modalStyle.close}>&times;</span>
                                        <h1>Edit Task</h1>
                                            <TaskForm btnText="Edit" taskEdit={task} closeModal={() =>setModal(false)} reloadTasks={getTasks} setToast={setToast} setMsg={setMsg}/>
                                            <ToastContainer></ToastContainer>
                                        </div>
                                        
                                    </div>
                                    )}
                                </td>
                           </tr>
                        
                            
                        ))
                    }
                </tbody>
            </table>
            
            {deleteModal && (
                    <div className={modalStyle.modal}>
                        <div className={modalStyle.modal_content}>
                        <h1>Delete Task</h1>
                            <h2>Tem certeza que deseja excluir?</h2>
                            <input className={Style.input_modal} onClick={() => handleDelete()} type="submit" value="Delete"></input>
                            <input onClick={() => setDelete(false)}type="submit" value="Cancel"></input>        
                        </div>
                    </div>
            )}
        </section>
    )
}

export default AllTasks