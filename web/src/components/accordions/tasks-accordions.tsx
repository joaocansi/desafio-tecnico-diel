import { Box, Grid } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from '../accordion';
import { useAuth } from '@/hooks/use-auth';
import Task from '../task';

const TasksAccordion = () => {
  const { tasks } = useAuth();
  const completedTasks = tasks.filter((task) => task.is_completed);
  const uncompletedTasks = tasks.filter((task) => !task.is_completed);

  return (
    <Grid item xs={12} lg={9}>
      <Grid container spacing={2}>
        <Grid xs={12} lg={6} item>
          <Accordion defaultExpanded sx={{ width: '100%' }}>
            <AccordionSummary>Tarefas Não Concluídas</AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={2}>
                {uncompletedTasks.map((task, index) => (
                  <Task index={index + 1} key={task.id} data={task} />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid xs={12} lg={6} item>
          <Accordion defaultExpanded sx={{ width: '100%' }}>
            <AccordionSummary>Tarefas Concluídas</AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={2}>
                {completedTasks.map((task, index) => (
                  <Task index={index + 1} key={task.id} data={task} />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TasksAccordion;
