import usersRouter from "@modules/users/routes/users.routes";
import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
export class UsersTokensRepository extends Repository<UserToken>{


     public async findByToken(token: string): Promise<UserToken | undefined> {

        const UserToken = await this.findOne({
               where: {
                        token,
                      }
        })
        return UserToken;

    }

    public async generate(user_id: string): Promise<UserToken | undefined> {

            const userToken = await this.create({
                user_id,
            });

            await this.save(userToken);

        return userToken;

    }
}
    export default UsersTokensRepository;
