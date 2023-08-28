import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCarImagesUseCase } from './ListCarImagesUseCase';

class ListCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const listCarImagesUseCase = container.resolve(ListCarImagesUseCase);

        const imagesForCar = await listCarImagesUseCase.execute(id);

        return response.json(imagesForCar);
    }
}

export { ListCarImagesController };
