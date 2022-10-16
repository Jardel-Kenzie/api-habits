import database from "../index.js";
import populateHabits from "./populateHabit.js";
import populateUser from "./populateUser.js";

(async () => {
    try{

    await database.sync();

    const user = await populateUser();

    await populateHabits(user.id);


    }catch (error) {
    console.log(error);
  }
})()