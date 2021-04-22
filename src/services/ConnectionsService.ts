import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionRepository } from "../repositories/ConnectionRepository";

interface IConnectionCreate {
  socket_id?: string;
  admin_id?: string;
  user_id: string;
  id?: string;
}
class ConnectionsService {
  private connectionRepository: ConnectionRepository;
  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionRepository);
  }
  async create({ user_id, admin_id, socket_id, id }: IConnectionCreate) {
    const connection = this.connectionRepository.create({
      user_id,
      admin_id,
      socket_id,
      id,
    });
    await this.connectionRepository.save(connection);
    return connection;
  }
}
export { ConnectionsService };
