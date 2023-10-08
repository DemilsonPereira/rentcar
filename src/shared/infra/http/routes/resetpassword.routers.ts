import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordEmailController } from '@modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController';
import { Router } from 'express';

const resetpasswordRouter = Router();

const sendForgotPasswordEmailController =
    new SendForgotPasswordEmailController();
const resetPasswordUserController = new ResetPasswordUserController();

resetpasswordRouter.post('/forgot', sendForgotPasswordEmailController.handle);
resetpasswordRouter.post('/reset', resetPasswordUserController.handle);

export { resetpasswordRouter };
