import { Driver } from '@/types/driver';
import * as S from './styles';
import { Button, Rating } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export type RideItemProps = {
  driver: Driver;
  onClickSolicitation: () => void;
  disableSolicitationButton?: boolean;
};

export const RideItem = ({ driver, onClickSolicitation, disableSolicitationButton }: RideItemProps) => {
  return (
    <S.Container>
      <S.HeaderContainer>
        <S.DriverInfoContainer>
          <S.Tooltip
            title={
              <S.TooltipContainer>
                <S.TooltipHeader>
                  <S.PrimaryText>Avaliação:</S.PrimaryText>
                  <Rating size="large" defaultValue={driver.review.rating} precision={0.5} readOnly />
                </S.TooltipHeader>
                <S.SecondaryText>{driver.review.comment}</S.SecondaryText>
              </S.TooltipContainer>
            }
          >
            <S.InfoItem>
              <S.InfoIcon />
              <S.PrimaryText color="primary.main">{driver.name}</S.PrimaryText>
            </S.InfoItem>
          </S.Tooltip>
          <S.InfoItem>
            <DirectionsCarIcon />
            <S.SecondaryText>{driver.vehicle}</S.SecondaryText>
          </S.InfoItem>
        </S.DriverInfoContainer>
        <S.PrimaryText>R$ {driver.value}</S.PrimaryText>
      </S.HeaderContainer>
      <S.FooterContainer>
        <S.SecondaryText>{driver.description}</S.SecondaryText>
        <Button variant="contained" onClick={onClickSolicitation} disabled={disableSolicitationButton}>
          Solicitar
        </Button>
      </S.FooterContainer>
    </S.Container>
  );
};
