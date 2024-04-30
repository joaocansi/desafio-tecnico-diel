import { Box, Grid } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from '../accordion';
import { useAuth } from '@/hooks/use-auth';
import Task from '../task';

const TasksAccordion = () => {
  const { tasks } = useAuth();

  return (
    <>
      <Grid xs={12} lg={4.5} item>
        <Accordion defaultExpanded sx={{ width: '100%' }}>
          <AccordionSummary>Tarefas Não Concluídas</AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection="column" gap={2}>
              {tasks
                .filter((task) => !task.is_completed)
                .map((task, index) => (
                  <Task index={index + 1} key={task.id} data={task} />
                ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid xs={12} lg={4.5} item>
        <Accordion defaultExpanded sx={{ width: '100%' }}>
          <AccordionSummary>Tarefas Concluídas</AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection="column" gap={2}>
              {tasks
                .filter((task) => task.is_completed)
                .map((task, index) => (
                  <Task index={index + 1} key={task.id} data={task} />
                ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
};

export default TasksAccordion;
