import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UserRepository";

interface IUserCreate {
  email: string;
}
class UserService {
  private userRepository:Repository<User>;
  constructor(){
      this.userRepository = getCustomRepository(UsersRepository)
  }
  async create({ email }: IUserCreate) {

    const userExists = await this.userRepository.findOne({ email });

    if (userExists) {
      return userExists;
    }

    const user = this.userRepository.create({ email });

    await this.userRepository.save(user);

    return user;
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
  
    return user;
  }
}
export { UserService };
