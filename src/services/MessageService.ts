import { getCustomRepository, Repository } from "typeorm";
import { Messages } from "../entities/Message";
import { MessageRepository } from "../repositories/MessagesRepository";

interface IMessagesCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}
class MessageService {
    private messagesRepository:Repository<Messages>;
    constructor(){
        this.messagesRepository = getCustomRepository(MessageRepository)
    }
  async create({ admin_id, text, user_id }: IMessagesCreate) {

    const messages = this.messagesRepository.create({ admin_id, text, user_id });
    await this.messagesRepository.save(messages);
    return messages;
  }

  async listByUser(user_id: string) {
 

    const list = await this.messagesRepository.find({
      where: { user_id },
      relations: ["user"],
    });

    return list;
  }
}
export { MessageService };
