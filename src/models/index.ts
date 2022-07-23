import { WatchTime } from "./WatchTime";
import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episodes";
import { Favorite } from "./Favorite";
import { User } from "./User";
import { Like } from "./Like";

Category.hasMany(Course);

Course.belongsTo(Category);
Course.hasMany(Episode);
Course.belongsToMany(User, { through: Favorite });
Course.belongsToMany(User, { through: Like });
Course.hasMany(Favorite, { as: "favoritesUsers", foreignKey: "course_id" });

Episode.belongsTo(Course);
Episode.belongsToMany(User, { through: WatchTime })

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

Like.belongsTo(Course);
Like.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.belongsToMany(Course, { through: Like });
User.hasMany(Favorite, { as: "favoritesCourses", foreignKey: "user_id" });
User.belongsToMany(Episode, { through: WatchTime })

export { Category, Course, Episode, Favorite, User, Like , WatchTime};
