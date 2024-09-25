import { ToDoModel } from "../models/ToDo.js";

class ToDoController{
    static async create(req,res){
        const {name, date, desc} = req.body;
        let description = desc;
        if(!description){
            description = name;
        }
       
        const ToDo = new ToDoModel({
            name: name,
            date: date,
            desc: description
        })
        try{
            const newToDo = await ToDo.save();
            res.status(200).json({message: "task cadastrada"});
        }catch(err){    
            res.status(500).json({message: "erro ao cadastrar" + err});
        }
    }
    static async read(req, res){
        const {id} = req.body;
        const task = await ToDoModel.findById(id);
        if(!task){
            res.status(404).json({message: "Task nao encontrada"});
            return;
        }
        res.status(200).json({message: task});
    }
    static async getAll(req, res){
        try{
            const tasks = await ToDoModel.find({});
            res.status(200).json({message: tasks});
        }catch(err){
            res.status(400).json({message: err});
        }
        
    }
    static async delete(req, res){
        const {id} = req.body;
        try{
            await ToDoModel.findByIdAndDelete(id);
            res.status(200).json({message: "deletado com sucesso"});
        }catch(err){
            res.status(400).json({message: err});
        }
    }
    static async update(req, res){
        const {id} = req.body;
        const data = req.body
        try{
            await ToDoModel.findByIdAndUpdate(id, data);
            res.status(200).json({message: "task atualizada"});
        }catch(err){
            res.status(400).json({message: err})
        }
    }

}

export default ToDoController;