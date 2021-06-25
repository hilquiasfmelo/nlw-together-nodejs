import { Router } from 'express';
import { CreateAuthenticateUserController } from './controllers/CreateAuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListTagController } from './controllers/ListTagController';
import { ListUserReceiverComplimentsController } from './controllers/ListUserReceiverComplimentsController';
import { ListUsersController } from './controllers/ListUsersController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createAuthenticateUserController = new CreateAuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUsersController = new ListUsersController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceiverComplimentsController =
  new ListUserReceiverComplimentsController();
const listTagController = new ListTagController();

router.post('/users', createUserController.handle);
router.get('/users', ensureAuthenticated, listUsersController.handle);
router.post('/session', createAuthenticateUserController.handle);

router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);

router.post(
  '/compliments',
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  '/compliments/send',
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);
router.get(
  '/compliments/receiver',
  ensureAuthenticated,
  listUserReceiverComplimentsController.handle
);

router.get('/tags', ensureAuthenticated, listTagController.handle);

export { router };
