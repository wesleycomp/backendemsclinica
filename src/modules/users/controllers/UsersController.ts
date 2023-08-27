import { Console } from "console";
import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import UpdateUserService from "../services/UpdateUserServices";
import ListUserService from "../services/ListUserService";

import ShowUserService from "../services/ShowUserService";

export default class UsersController{

        public async index(request: Request, response: Response): Promise<Response> {

            const listUser =  new ListUserService();
            const user = await listUser.execute();

            return response.json(user);
        }

        public async show(request: Request, response: Response): Promise<Response>{

                const { id } = request.params;
                const showUsers = new ShowUserService();
                const user = await showUsers.execute({ id })

                return response.json(user);
        }

        public async create(request: Request, response: Response): Promise<Response>{

            const {name, email, password, perfil} = request.body;
            const createUser =  new CreateUserService();

            const user = await createUser.execute({
                name,
                email,
                password,
                perfil
            })

            return response.json(user);
        }
        public async update(request: Request, response: Response): Promise<Response>{

            const {id, name,
                email,
                password,
                perfil } = request.body;
            const resetPassword =  new UpdateUserService();

           await resetPassword.execute({
                    id,
                    name,
                    email,
                    password,
                    perfil
            })

            return response.json(resetPassword);
        }

}
