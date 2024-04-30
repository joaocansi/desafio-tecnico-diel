import { Router } from 'express';
import isAuthenticatedMiddleware from '../auth/middlewares/is-authenticated-middleware';
import TagsController from './controllers/tags-controller';

const tagsRouter = Router();
tagsRouter.use(isAuthenticatedMiddleware);

const tagsController = new TagsController();
tagsRouter.post('/', tagsController.create);
tagsRouter.get('/', tagsController.getAll);
tagsRouter.delete('/:id', tagsController.delete);
tagsRouter.put('/:id', tagsController.update);

export default tagsRouter;
