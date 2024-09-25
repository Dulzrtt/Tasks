import {Router} from "express";
import ToDoController from "../controllers/ToDoController.js"
//validations
import { validate } from "../middleware/handleValidations.js";
import { createValidation } from "../middleware/createValidations.js";
import { getValidation } from "../middleware/getValidation.js";

const router = Router();


router.post('/create', createValidation(), validate, ToDoController.create);
router.get('/read', getValidation(), validate, ToDoController.read);
router.get('/getAll', ToDoController.getAll);
router.delete('/delete', getValidation(), validate, ToDoController.delete);
router.patch('/update', createValidation(), validate, ToDoController.update);

export default router