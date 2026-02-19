import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import PropTypes from 'prop-types';

import styles from './Map.module.css';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocate } from '../hooks/useGeolocate';
import Button from '../components/Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
  const [mapPos, setMapPos] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocatePosition,
    getPosition,
  } = useGeolocate();

  const [mapLat, mapLng] = useUrlPosition();

  // Sync: Changes in URL with map state
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPos([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  // Sync: Update map state with position from geolocation
  useEffect(
    function () {
      if (geolocatePosition)
        setMapPos([geolocatePosition.lat, geolocatePosition.lng]);
    },
    [geolocatePosition]
  );

  return (
    <div
      className={styles.mapContainer}
      // onClick={() => {
      //   navigate('form');
      // }}
    >
      {!geolocatePosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPos}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPos} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

ChangeCenter.propTypes = {
  position: PropTypes.array,
};

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      // console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
