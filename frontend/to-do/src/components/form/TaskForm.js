import api from "../../utils/api"
import { useEffect, useState } from "react"
import styles from './Form.module.css'

function TaskForm({btnText, taskEdit, closeModal, reloadTasks, setToast, setMsg}){
    const [task, setTask] = useState({
        name: '',
        desc: '',
        date: '',
    })

    useEffect(() => {
        if(taskEdit) {
        const dateEdit = taskEdit.date.split("T")[0];
        setTask({
            name: taskEdit.name || '', 
            desc: taskEdit.desc || '',
            date: dateEdit || '',
          });
        setTask(prevTask => ({
            ...prevTask, id: taskEdit._id
        }))
        
        }
      }, [taskEdit]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e){
        e.preventDefault();
        if(taskEdit){
            try{
                const response = await api.patch("/update", task);
                console.log("task editada com sucesso", response.data);
                setToast(1);
                setMsg('Task editada com sucesso');
                closeModal();
                reloadTasks();     
            }catch(err){
                console.log(err);
                setMsg(err.response.data.errors[0].msg);
                setToast(2);
            }
        }else{
            try{
                const response = await api.post("/create", task);
                setMsg('Task cadastrada com sucesso')
                setToast(1);
                console.log('task adicionada com sucesso', response.data);
                setTask({
                    name: '',
                    desc: '',
                    date: '',
                });
            }catch(err){
                console.log(err.response.data.errors[0].msg);
                setMsg(err.response.data.errors[0].msg);
                setToast(2);
            }
        }
    }
    
    
    return (
        <section className={styles.section_form}>
            <div className={styles.div_form}>
                <form onSubmit={handleSubmit} className={styles.form_style}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Digite a task"
                        onChange={handleChange}
                        value={task.name}
                    />
                    <input
                        type="text"
                        name="desc"
                        placeholder="Digite a desc"
                        onChange={handleChange}
                        value={task.desc}
                    />
                    <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        value={task.date}
                    />
                    <input type="submit" value={btnText}></input>
                </form>
            </div>
        </section>
    )
}

export default TaskForm