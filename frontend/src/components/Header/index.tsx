import * as S from './styles';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';

export type HeaderProps = {
  title: string;
  hiddenNav?: boolean;
};

export const Header = ({ title, hiddenNav }: HeaderProps) => {
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Line />
        <S.Title variant="h4">{title}</S.Title>
      </S.TitleContainer>
      {!hiddenNav && (
        <S.Nav>
          <S.NavItem to="/">
            <HomeIcon />
          </S.NavItem>
          <S.NavItem to="/history">
            <HistoryIcon />
          </S.NavItem>
        </S.Nav>
      )}
    </S.Container>
  );
};
