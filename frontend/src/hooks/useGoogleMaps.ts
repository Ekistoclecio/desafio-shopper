import { useSnackbar } from '@/providers/Snackbar';
import { useEffect, useRef } from 'react';

type LatLng = {
  lat: number;
  lng: number;
};

const useGoogleMaps = (origin?: LatLng, destination?: LatLng) => {
  const { enqueueSnackbar } = useSnackbar();
  const apiKey = 'AIzaSyA422FEixa0Puyf8LSRU_2grvo--bP4avw';
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMap = () => {
      if (!mapRef.current || !origin || !destination) return;

      const map = new google.maps.Map(mapRef.current, {
        center: origin,
        zoom: 10,
      });

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
          } else {
            enqueueSnackbar('Erro ao buscar a rota', { severity: 'error' });
          }
        },
      );
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = loadMap;
    document.body.appendChild(script);

    return () => {
      if (script) {
        script.remove();
        delete window.initMap;
      }
    };
  }, [apiKey, origin, destination]);

  return mapRef;
};

export default useGoogleMaps;
