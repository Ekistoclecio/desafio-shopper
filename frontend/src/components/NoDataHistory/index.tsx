import { Typography } from '@mui/material';
import * as S from './styles';

export type NoDataHistoryProps = {
  message: string;
};

export const NoDataHistory = ({ message }: NoDataHistoryProps) => {
  return (
    <S.Container>
      <img
        alt="Nenhuma viagem a ser exibida"
        data-testid="no-data-image"
        src="/images/no-data.svg"
        style={{
          width: '360px',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <Typography textAlign={'center'} variant="h4">
        {message}
      </Typography>
    </S.Container>
  );
};
