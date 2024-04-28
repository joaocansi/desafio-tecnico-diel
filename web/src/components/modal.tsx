import { Dialog, type DialogProps } from '@mui/material';

export type ModalProps = DialogProps;

export default function Modal({ children, ...props }: ModalProps) {
  return <Dialog {...props}>{children}</Dialog>;
}
