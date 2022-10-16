import Habit from "../database/models/habits.js"
import { AppError } from "../errors/index.js"
import { normalizeData, removeUnnecessaryKeys } from "../helpers/index.js"

class HabitService {
  static listHabits = async (userId) => {
    const habits = await Habit.findAll({ where: { user_id: userId } })

    return habits
  }

  static createHabit = async (sentHabit, user_id = null) => {
    const normalizedHabit  = normalizeData(sentHabit)

    const { title, category, description } = normalizedHabit

    
    const habit = await Habit.create({
      title,
      category,
      description,
      complete: false,
      user_id,
    })
    
   
    return habit
  }

  static updateHabit = async (habitId, habitUpdates, user_id = null) => {
    const habit = await Habit.findOne({ where: { id: habitId } })

    if (!habit) {
      throw new AppError(404, "Habit not found.")
    }

    habitUpdates = removeUnnecessaryKeys(habitUpdates)

    if (Object.keys(habitUpdates).length == 0) {
      throw new AppError(
        401,
        "You must pass at least one of these keys and its corresponding value: [title, description, category]"
      )
    }

    habitUpdates.complete = habit.complete

    if (!habit.user_id || habit.user_id == user_id) {
      const updatedHabit = habit.update(habitUpdates)

      return updatedHabit
    }

    throw new AppError(401, "You must own this habit to update it.")
  }

  static statusHabit = async (habitId, user_id = null, booolean) => {
    const habit = await Habit.findOne({ where: { id: habitId } })

    if (!habit) {
      throw new AppError(404, "Habit not found.")
    }

    const habitUpdates = {
      complete: booolean
    }

    if (!habit.user_id || habit.user_id == user_id) {
      const updatedHabit = habit.update(habitUpdates)

      return updatedHabit
    }

    throw new AppError(401, "You must own this habit to update it.")

  }


  static deleteHabit = async (habitId, user_id = null) => {
    const habit = await Habit.findOne({ where: { id: habitId } })

    if (!habit) {
      throw new AppError(404, "Habit not found.")
    }

    if (!habit.user_id || habit.user_id == user_id) {
      return habit.destroy()
    }

    throw new AppError(401, "You must own this habit to delete it.")
  }
}

export default HabitService
