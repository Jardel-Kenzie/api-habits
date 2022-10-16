import Sequelize, {Model} from "sequelize"

class Habit extends Model{
    static init(sequelize){
        super.init({
            id:{
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            title:{
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "title not empty!"
                    },
                    notNull: {
                        msg: "title is required!"
                    }
                }
            },
            description:{
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "description not empty!"
                    },
                    notNull: {
                        msg: "description is required!"
                    }
                }
            },
            category:{
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "category can't be empty!",
                    },
                    isIn:{
                        args: [["Saúde", "Estudo", "Casa", "Trabalho", "Lazer"]],
                        msg: "category must be one of these: Saúde, Estudo, Casa, Trabalho, Lazer"
                    },
                    notNull: {
                        msg: "category is required!"
                    }
                    
                }
            },
            complete:{
                type: Sequelize.BOOLEAN,
                defaultValue: false,                
                allowNull: false,
            }
        },{
            timestamps:true,
            tableName: "habits",
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: "user_id", as:"users"})
    }
}

export default Habit
