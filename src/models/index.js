import Feed from "./feed.js";
import User from "./user.js";

User.hasMany(Feed, { foreignKey: 'userId' });
Feed.belongsTo(User, { foreignKey: 'userId' });
export { User, Feed}
