import {
  DialogTitle,
  DialogContent,
  Box,
  DialogContentText,
  Typography,
} from '@mui/material';
import { useAuth } from '@/hooks/use-auth';
import { MuiChipsInput, type MuiChipsInputChip } from 'mui-chips-input';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Modal, { type ModalChildrenProps } from '../modal';
import toast from 'react-hot-toast';
import editTagUsecase from '@/server/usecases/edit-tag.usecase';
import deleteTagUsecase from '@/server/usecases/delete-tag.usecase';
import createTagUsecase from '@/server/usecases/create-tag.usecase';
import * as Yup from 'yup';
import messages from '@/utils/default-messages';
import Button from '../button';

const ChipValidation = Yup.string().max(48).required();

export default function CustomizeTagsModal(props: ModalChildrenProps) {
  const { tags, updateTag, deleteTag, createTag } = useAuth();
  const [chips, setChips] = useState<MuiChipsInputChip[]>([]);

  useEffect(() => {
    setChips(tags.map((tag) => tag.name));
  }, [tags]);

  const handleChange = (newChips: MuiChipsInputChip[]) => {
    setChips(newChips);
  };

  const handleAddChip = (newChip: string) => {
    toast.promise(createTagUsecase(newChip), {
      loading: messages.loading,
      success: (tag) => {
        createTag(tag);
        return messages.objectCreated.replace('{0}', 'Tag');
      },
      error: (err) => {
        setChips((prev) => prev.slice(0, -1));
        return err.message;
      },
    });
  };

  const handleEditChip = (newValue: string, index: number) => {
    const previousValue = chips[index];
    const tag = tags.find((tag) => tag.name === previousValue);
    if (!tag) return;

    toast.promise(editTagUsecase({ id: tag.id, name: newValue }), {
      loading: messages.loading,
      success: () => {
        updateTag({ ...tag, name: newValue });
        return messages.objectUpdated.replace('{0}', 'Tag');
      },
      error: (err) => {
        setChips((prev) =>
          prev.map((chip, i) => (i === index ? previousValue : chip)),
        );
        return err.message;
      },
    });
  };

  const handleDelete = (deletedChip: string, index: number) => {
    const tag = tags.find((tag) => tag.name === deletedChip);
    if (!tag) return;

    toast.promise(deleteTagUsecase(tag.id), {
      loading: messages.loading,
      success: () => {
        deleteTag(tag.id);
        return messages.objectDeleted.replace('{0}', 'Tag');
      },
      error: (err) => {
        setChips((prev) => {
          const newChips = [
            ...prev.slice(0, index),
            tag.name,
            ...prev.slice(index),
          ];
          return newChips;
        });
        return err.message;
      },
    });
  };

  return (
    <Modal {...props} maxWidth="sm" fullWidth>
      <DialogTitle variant="h5">Personalizar Tag</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <Typography variant="body1" fontWeight="bold">
            Siga as instruções abaixo para melhor experiência
          </Typography>
          <ul>
            <li>
              Para criar uma nova tag, basta digitar o nome dela e pressionar
              Enter.
            </li>
            <li>Para deletar uma tag, clique no ícone de rosto.</li>
            <li>
              Para editar uma tag, clique duas vezes sobre ela, digite o novo
              nome e pressione Enter.
            </li>
          </ul>
        </DialogContentText>
        <Box component="form">
          <MuiChipsInput
            value={chips}
            label="Tags"
            placeholder="Adicione tags..."
            onChange={handleChange}
            onEditChip={handleEditChip}
            onDeleteChip={handleDelete}
            onAddChip={handleAddChip}
            fullWidth
            disableDeleteOnBackspace
            hideClearAll
            validate={(chip) => {
              try {
                ChipValidation.validateSync(chip);
              } catch (error) {
                if (error instanceof Yup.ValidationError) {
                  return {
                    isError: true,
                    textError: error.message,
                  };
                }
                return {
                  isError: true,
                  textError: messages.internalError,
                };
              }

              return {
                isError: tags.some((tag) => tag.name === chip),
                textError: messages.objectAlreadyExists.replace('{0}', 'Tag'),
              };
            }}
            renderChip={(Component, key, props) => {
              return (
                <Component {...props} key={key} deleteIcon={<CloseIcon />} />
              );
            }}
          />
          <Button sx={{ mt: 1.5 }} onClick={props.onClose}>
            Fechar
          </Button>
        </Box>
      </DialogContent>
    </Modal>
  );
}
