import { Dialog, type DialogProps } from '@mui/material';

export type ModalProps = DialogProps & {
  onClose: () => void;
};

export type ModalChildrenProps = Omit<ModalProps, 'children'>;

export default function Modal({ children, ...props }: ModalProps) {
  return <Dialog {...props}>{children}</Dialog>;
}
