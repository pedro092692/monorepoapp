import { check, validationResult} from "express-validator";



function validateFields(rule){
    const validationRule = {
        updateUser:[
            check("email").optional().notEmpty().isEmail().withMessage("A valid email is required"),
            check("password").optional().isLength({min: 6}).withMessage("Password must be at least 6 characters"),

        ],

        createSecret:[
            check("userId").notEmpty().withMessage("User Id is required"),
            check("content").notEmpty().withMessage("Content is required"),
            check("title").notEmpty().withMessage("Title is required"),
        ],

        login:[
            check("email").notEmpty().isEmail().withMessage("A valid email is required"),
            check("password").notEmpty().withMessage("Password is required"),
        ]
    }

    return [...validationRule[rule], 
            (req, res, next) =>{
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                    const messages = errors.array().map(err => err.msg);
                    return res.status(400).json({errors: messages});
                }
                next();
            }
        ];
}

export { validateFields };