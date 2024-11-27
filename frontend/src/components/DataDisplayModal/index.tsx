import { Modal } from '@mui/material';
import * as S from './styles';
import { ReactNode } from 'react';

export type DataDisplayModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
};

export const DataDisplayModal = ({ open, handleClose, title, children }: DataDisplayModalProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <S.Container>
        <S.Title variant="h4">{title}</S.Title>
        <S.Content>{children}</S.Content>
        <S.CloseButton variant="text" color="primary" onClick={handleClose}>
          Fechar
        </S.CloseButton>
      </S.Container>
    </Modal>
  );
};
