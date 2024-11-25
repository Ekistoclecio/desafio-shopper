import { Outlet } from 'react-router';

import * as S from './styles';

export const Layout = () => {
  return (
    <S.Container>
      <S.Paper elevation={5} component="main">
        <Outlet />
      </S.Paper>
    </S.Container>
  );
};
