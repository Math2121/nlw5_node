import { EntityRepository, Repository } from "typeorm";
import { Messages } from "../entities/Message";

@EntityRepository(Messages)
class MessageRepository extends Repository<Messages>{

}

export {MessageRepository}