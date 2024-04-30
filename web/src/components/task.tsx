import { Box, Chip, Grid, Typography, colors } from '@mui/material';
import dayjs from 'dayjs';
import Button from './button';
import { useAuth, type Task as ITask } from '@/hooks/use-auth';
import toast from 'react-hot-toast';
import deleteTaskUsecase from '@/server/usecases/delete-task.usecase';
import EditTaskModal from './modals/edit-task-modal';
import { useState } from 'react';
import messages from '@/utils/default-messages';
import markTaskAsCompletedUsecase from '@/server/usecases/mark-task-as-completed.usecase';
import markTaskAsUncompletedUsecase from '@/server/usecases/mark-task-as-uncompleted.usecase';

interface TaskProps {
  index: number;
  data: ITask;
}

const Task = ({ data, index }: TaskProps) => {
  const [editTaskModal, setEditTaskModal] = useState(false);
  const { updateTask, deleteTask } = useAuth();

  const handleComplete = () => {
    toast.promise(markTaskAsCompletedUsecase(data.id), {
      loading: messages.loading,
      success: () => {
        updateTask({
          ...data,
          is_completed: true,
        });
        return 'Tarefa concluída com sucesso!';
      },
      error: (err) => err.message,
    });
  };

  const handleUncomplete = () => {
    toast.promise(markTaskAsUncompletedUsecase(data.id), {
      loading: messages.loading,
      success: () => {
        updateTask({
          ...data,
          is_completed: false,
        });
        return 'Tarefa concluída com sucesso!';
      },
      error: (err) => err.message,
    });
  };

  const handleDelete = () => {
    toast.promise(deleteTaskUsecase(data.id), {
      loading: messages.loading,
      success: () => {
        deleteTask(data.id);
        return messages.objectDeleted.replace('{0}', 'tarefa');
      },
      error: (err) => err.message,
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: colors.grey[300],
        borderRadius: '5px',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
      }}
    >
      <Box display="flex" gap={1}>
        <Typography variant="subtitle1" color={colors.grey[600]}>
          #{index}
        </Typography>
        <Typography variant="h5">{data.title}</Typography>
      </Box>
      <Typography variant="subtitle1" mt={-1.5}>
        <b>Data da Tarefa:</b> {dayjs(data.date).utc().format('DD/MM/YYYY')}
      </Typography>
      <Box display="flex" gap={1}>
        {data.tags.map((tag) => (
          <Chip key={tag.id} label={tag.name} />
        ))}
      </Box>
      <Typography whiteSpace="pre">{data.description}</Typography>
      <Grid container mt={1} spacing={1}>
        <Grid item xs={12} sm={6}>
          {data.is_completed ? (
            <Button
              onClick={handleUncomplete}
              size="small"
              variant="contained"
              color="success"
            >
              Desfazer
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              size="small"
              variant="contained"
              color="success"
            >
              Concluir
            </Button>
          )}
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            onClick={() => {
              setEditTaskModal(true);
            }}
            size="small"
            variant="contained"
            color="primary"
          >
            Editar
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            onClick={handleDelete}
            size="small"
            variant="contained"
            color="error"
          >
            Deletar
          </Button>
        </Grid>
      </Grid>
      <EditTaskModal
        task={data}
        open={editTaskModal}
        onClose={() => {
          setEditTaskModal(false);
        }}
      />
    </Box>
  );
};

export default Task;
