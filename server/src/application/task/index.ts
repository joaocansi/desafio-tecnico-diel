import { Router } from 'express';
import TaskController from './controllers/task-controller';
import isAuthenticatedMiddleware from '../auth/middlewares/is-authenticated-middleware';

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.use(isAuthenticatedMiddleware);
taskRouter.post('/', taskController.create);
taskRouter.get('/', taskController.getAll);
taskRouter.delete('/:id', taskController.delete);
taskRouter.put('/:id', taskController.update);
taskRouter.patch('/:id', taskController.updateTaskCompletion);

export default taskRouter;
