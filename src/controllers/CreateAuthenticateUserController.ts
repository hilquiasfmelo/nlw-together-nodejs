import { Request, Response } from 'express';
import { CreateAuthenticateUserService } from '../services/CreateAuthenticateUserService';

class CreateAuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const createAuthenticateUserService = new CreateAuthenticateUserService();

    const token = await createAuthenticateUserService.execute({
      email,
      password,
    });

    return response.json(token);
  }
}

export { CreateAuthenticateUserController };
