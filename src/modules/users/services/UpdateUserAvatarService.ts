import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFilename: string; // continua vindo do upload (multer), mas não salvaremos no DB
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    // Sem coluna/avatar no banco: não alteramos nada no usuário.
    // O arquivo já foi tratado pelo middleware de upload.
    // (Se quiser mover/renomear fisicamente, faça aqui, mas não é obrigatório para compilar.)

    return user;
  }
}

export default UpdateUserAvatarService;
