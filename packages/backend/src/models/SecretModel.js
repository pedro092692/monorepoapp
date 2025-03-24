import { DataTypes, Model } from "sequelize";

class Secret extends Model{
    //relations
    static assosiation(model){
        this.belongsTo(model.User, {
            foreignKey: "userId",
            as: "user",
        })
    }
}

function initializeSecret(sequelize){
    Secret.init(
        {
            // model attributes
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            userId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references:{
                    model: "users",
                    key: 'id',
                },
                onUpdate: 'CASCADE', 
                onDelete: 'CASCADE',
            },

            content:{
                type:DataTypes.TEXT,
                allowNull: false
            },

            date:{
                type:DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            title:{
                type:DataTypes.STRING,
                allowNull: false, 
            }
        },
        {
            sequelize,
            modelName: "Secret",
            tableName: "secrets",
            timestamps: false
        }
    );

    return Secret;
}

export { Secret, initializeSecret };