import { Request, Response } from "express";

import { UserService } from "../services/UserService";
class UserController {
  async create(request: Request, response: Response):Promise<Response> {
    const { email } = request.body;
    const userService = new UserService();
    try {
      const users = await userService.create(email);
      return response.json(users);

    } catch (error) {
      return response.status(400).json({error: error.message})
    }
  }
}
export { UserController };
