import { Sequelize } from "sequelize";

const db = new Sequelize('flight_system', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
})

export default db