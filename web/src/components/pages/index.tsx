'use client';

import { Grid } from '@mui/material';
import { useState } from 'react';
import Button from '@/components/button';
import MainContainer from '@/components/containers/main-container';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import CreateTaskModal from '../modals/create-task-modal';

import TasksAccordion from '../accordions/tasks-accordions';
import CustomizeTagsModal from '../modals/customize-tags-modal';
import Filters from '../forms/filters';
dayjs.extend(utc);

export default function Page() {
  return (
    <MainContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <ModalButtons />
          <Filters />
        </Grid>
        <TasksAccordion />
      </Grid>
    </MainContainer>
  );
}

const ModalButtons = () => {
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [customizeTagsModalOpen, setCustomizeTagsModalOpen] = useState(false);

  const handleCustomizeTagsModalOpen = () => {
    setCustomizeTagsModalOpen(true);
  };

  const handleCreateTaskModalOpen = () => {
    setCreateTaskModalOpen(true);
  };

  const handleCreateTaskModalClose = () => {
    setCreateTaskModalOpen(false);
  };

  const handleCustomizeTagsModalClose = () => {
    setCustomizeTagsModalOpen(false);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} lg={12} xl={6}>
        <Button color="success" onClick={handleCreateTaskModalOpen}>
          Criar tarefa
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} lg={12} xl={6}>
        <Button color="warning" onClick={handleCustomizeTagsModalOpen}>
          Editar Tags
        </Button>
      </Grid>
      <CreateTaskModal
        open={createTaskModalOpen}
        onClose={handleCreateTaskModalClose}
      />
      <CustomizeTagsModal
        onClose={handleCustomizeTagsModalClose}
        open={customizeTagsModalOpen}
      />
    </Grid>
  );
};
