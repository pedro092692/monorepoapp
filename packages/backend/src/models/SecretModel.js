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
                type:DataTypes.INTEGER,
                allowNull: false,
                references:{
                    model: "users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },

            content:{
                type:DataTypes.TEXT,
                allowNull: false
            },

            date:{
                type:DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            }
        },
        {
            sequelize,
            modelName: "Secret",
            tableName: "secrets",
            timestamps: false
        }
    )
}

export { Secret, initializeSecret };