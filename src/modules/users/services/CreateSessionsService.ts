import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import authConfig from '@config/auth';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { sign, type Secret, type SignOptions } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password', 401);
    }

    // Tipamos explicitamente para satisfazer @types/jsonwebtoken v9
    const secret: Secret = authConfig.jwt.secret as string;
    const expiresIn: SignOptions['expiresIn'] = authConfig.jwt.expiresIn as any;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionsService;
