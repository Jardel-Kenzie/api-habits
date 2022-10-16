import Sequelize from "sequelize"
import Habit from "./models/habits.js"
import User from "./models/user.js"

const config = {
    dialect: 'sqlite',
    storage: './database.sqlite'
}

const database = new Sequelize(config)

User.init(database)
Habit.init(database)

Habit.associate(database.models)


export default database