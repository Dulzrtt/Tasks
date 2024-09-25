import { body } from "express-validator";

export const createValidation = () => {
    return [ 
        body("name").isString().isLength({min: 1}).withMessage("Nome obrigatorio"),
        body("date").isISO8601().withMessage("Data obrigatoria"),
    ];
};