import { AppError, handleAppError, handleErrors } from "../errors/index.js"
import { getUserId } from "../helpers/index.js"
import HabitService from "../services/habits.service.js"

class HabitController {
  static listHabits = async (request, response) => {
    try {
      const userId = getUserId(request.headers.authorization)

      const habits = await HabitService.listHabits(userId)

      return response.status(200).send(habits)
    } catch (error) {
      return response.status(400).send(response.error)
    }
  }

  static createHabit = async (request, response) => {
    try {
      const userId = getUserId(request.headers.authorization)

      const habit = await HabitService.createHabit(request.body, userId)

      return response.status(201).json(habit)
    } catch (error) {
      console.log(error, "=========================")
      if (error instanceof AppError) {
        handleAppError(error, response)
      } else {
        return response.status(400).send(handleErrors(error))
      }
    }
  }

  static updateHabit = async (request, response) => {
    try {
      const { habit_id } = request.params

      const userId = getUserId(request.headers.authorization)

      const habit = await HabitService.updateHabit(
        habit_id,
        request.body,
        userId
      )

      return response.status(200).json(habit)
    } catch (error) {
      if (error instanceof AppError) {
        handleAppError(error, response)
      } else {
        return response.status(400).send(handleErrors(error))
      }
    }
  }

  static deleteHabit = async (request, response) => {
    try {
      const { habit_id } = request.params

      const userId = getUserId(request.headers.authorization)

      await HabitService.deleteHabit(habit_id, userId)

      return response.status(200).json()
    } catch (error) {
      if (error instanceof AppError) {
        handleAppError(error, response)
      } else {
        return response.status(400).send(handleErrors(error))
      }
    }
  }

  static completeHabit = async (request, response) => {
    try{
        const { habit_id } = request.params

        const userId = getUserId(request.headers.authorization)

        const habit = await HabitService.statusHabit(habit_id, userId, true)

        return response.status(200).json(habit)

    }catch (error) {
      if (error instanceof AppError) {
        handleAppError(error, response)
      } else {
        return response.status(400).send(handleErrors(error))
      }
    }
  }

  static incompleteHabit = async (request, response) => {
    try{
        const { habit_id } = request.params

        const userId = getUserId(request.headers.authorization)

        const habit = await HabitService.statusHabit(habit_id, userId, false)

        return response.status(200).json(habit)

    }catch (error) {
      if (error instanceof AppError) {
        handleAppError(error, response)
      } else {
        return response.status(400).send(handleErrors(error))
      }
    }
  }


}

export default HabitController
