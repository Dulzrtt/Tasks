import { body } from "express-validator";

export const getValidation = () => {
    return [ 
        body("id").isString().withMessage("Id Obrigatorio"),
    ];
};