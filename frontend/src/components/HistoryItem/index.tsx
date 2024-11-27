import { Box } from '@mui/material';
import * as S from './styles';
import { Ride } from '@/types/ride';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
export type HistoryItemProps = {
  ride: Ride;
};

export const HistoryItem = ({ ride }: HistoryItemProps) => {
  return (
    <S.Container>
      <S.HeaderContainer>
        <S.DateContainer>
          <S.CalendarMonthIcon />
          <S.SecondaryText>{ride.date}</S.SecondaryText>
        </S.DateContainer>
        <S.PrimaryText>R$ {ride.value}</S.PrimaryText>
      </S.HeaderContainer>
      <Box>
        <S.PrimaryText>{ride.origin}</S.PrimaryText>
        <S.DestinationContainer>
          <S.SubdirectoryArrowRightIcon />
          <S.PrimaryText>{ride.destination}</S.PrimaryText>
        </S.DestinationContainer>
      </Box>
      <S.InfoContainer>
        <S.InfoItem>
          <LocationOnIcon />
          <S.SecondaryText>{ride.distance} km</S.SecondaryText>
        </S.InfoItem>
        <S.InfoItem>
          <AccessTimeIcon />
          <S.SecondaryText>{ride.duration}</S.SecondaryText>
        </S.InfoItem>
        <S.InfoItem>
          <PersonIcon />
          <S.SecondaryText>{ride.driver.name}</S.SecondaryText>
        </S.InfoItem>
      </S.InfoContainer>
    </S.Container>
  );
};
