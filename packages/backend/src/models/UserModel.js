import { DataTypes, Model } from "sequelize";

class User extends Model {}

function initializeUser(sequelize){
    User.init(
        {
            // model attributes 
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notEmpty: true,
                    isEmail: true,
                }
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    len: 6, 
                    msg: "password must be at least 6 characters",
                }
            }
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: false
        }
    );
    return User;
}

export {User, initializeUser};