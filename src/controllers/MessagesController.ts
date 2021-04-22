import { Request, Response } from "express";

import { MessageService } from "../services/MessageService";

class MessagesController {
  async create(request: Request, response: Response) {
    const { admin_id, text, user_id } = request.body;
    const messageService = new MessageService();
    try {
      const messages = await messageService.create({  admin_id, text, user_id});
      return response.json(messages);
    } catch (error) {
      
      return response.status(400).json({error: error.message})
    }
  }

  async showByUser(request: Request, response: Response){
      const {id} = request.params
      const messageService = new MessageService();

      const list= await messageService.listByUser(id);
      return response.json(list)
  }
}
export { MessagesController };
