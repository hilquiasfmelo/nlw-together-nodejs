import { Router } from 'express';
import { CreateAuthenticateUserController } from './controllers/CreateAuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createAuthenticateUserController = new CreateAuthenticateUserController();
const createComplimentController = new CreateComplimentController();

router.post('/users', createUserController.handle);
router.post('/session', createAuthenticateUserController.handle);

router.post('/tags', ensureAdmin, createTagController.handle);
router.post('/compliments', createComplimentController.handle);

export { router };
