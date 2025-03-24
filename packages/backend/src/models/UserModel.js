import { DataTypes, Model } from "sequelize";

class User extends Model {
    //relations 
    static association(model){
        this.hasMany(model.Secret, {
            foreignKey: "userId",
            as: "secrets",
        });

    }
}

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
                    notEmpty: {
                        msg: "Email cannot be empty"
                        },
                    isEmail:{
                        msg: "A valid email is required"
                    },
                },
                unique:{
                    msg: "This email already has been taken"
                }
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    len:{
                        args: [6],
                        msg: "Password must be at least 6 characters",
                    }
                }
            },
            role:{
                type: DataTypes.ENUM("admin", 'user'),
                allowNull: false,
                defaultValue: "user",
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