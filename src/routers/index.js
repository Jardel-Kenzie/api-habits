import verifyToken from "../middlewares/authToken.middleware.js"
import habitsRouter from "./habits.router.js"
import userRouter from "./user.router.js"

const appRoutes = (app) => {
    app.use("", userRouter)
    app.use("/habits", verifyToken, habitsRouter)
}

export default appRoutes
  