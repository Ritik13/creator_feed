import { Model, DataTypes } from "sequelize"
import sequelize_instance from "../config/database.js"

const Feed = sequelize_instance.define(
    'Feed',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('draft', 'published'),
            defaultValue: 'draft'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
export default Feed
