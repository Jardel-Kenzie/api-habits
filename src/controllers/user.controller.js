import { handleErrors } from "../errors/index.js";
import UserService from "../services/user.service.js";

class UserController {
  static register = async (request, response) => {
    try {

      const {username, email, password} = request.body

      if(!username || !email || !password){
        return response.status(400).json("username, email or password is null")
      }


      const user = await UserService.register(request.body);

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).send(handleErrors(error));
    }
  };

  static login = async (request, response) => {
    try {

      const {email, password} = request.body

      if(!email || !password){
        return response.status(400).json("email or password is null")
      }

      const user = await UserService.login(request.body);

      return response.status(200).json(user);
    } catch (error) {
      
      return response.status(401).json("Invalid email or password");
    }
  };
}

export default UserController;
