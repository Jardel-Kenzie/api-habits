import {Router} from "express"
import HabitController from "../controllers/habits.controller.js"

const habitsRouter = Router()

habitsRouter.get("", HabitController.listHabits)
habitsRouter.post("", HabitController.createHabit)
habitsRouter.patch("/:habit_id", HabitController.updateHabit)
habitsRouter.delete("/:habit_id", HabitController.deleteHabit)
habitsRouter.post("/complete/:habit_id", HabitController.completeHabit)
habitsRouter.post("/incomplete/:habit_id", HabitController.incompleteHabit)

export default habitsRouter