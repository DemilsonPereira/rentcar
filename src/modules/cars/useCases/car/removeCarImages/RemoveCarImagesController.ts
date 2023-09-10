import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RemoveCarImagesUseCase } from './RemoveCarImagesUseCase';

class RemoveCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id, image_ids } = request.body;

        const removeCarImagesUseCase = container.resolve(
            RemoveCarImagesUseCase
        );

        await removeCarImagesUseCase.execute({ car_id, image_ids });

        return response
            .status(200)
            .json({ message: 'Images deleted successfully' });
    }
}

export { RemoveCarImagesController };
