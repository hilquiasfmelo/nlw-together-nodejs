import { Request, Response } from 'express';
import { ListUserReceiverComplimentsService } from '../services/ListUserReceiverComplimentsService';

class ListUserReceiverComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSendComplimentsService =
      new ListUserReceiverComplimentsService();

    const complimentsReceiver = await listUserSendComplimentsService.execute(
      user_id
    );

    return response.json(complimentsReceiver);
  }
}

export { ListUserReceiverComplimentsController };
