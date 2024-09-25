import express from "express";
import cors from "cors";

const app = express();

//json response
app.use(express.json());

//cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));

//public imagesn
app.use(express.static('public'));

//routes
import Router from "./routes/ToDoRoutes.js";
app.use("/ToDo", Router);
//db
import connect from "./db/conn.js";

app.listen(5000, async () =>{
    await connect();
    console.log("Rodando na porta 5000");
});