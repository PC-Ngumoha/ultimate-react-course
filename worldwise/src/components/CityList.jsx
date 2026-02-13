import Spinner from './Spinner';
import styles from './CityList.module.css';
import CityItem from './CityItem';
import Message from './Message';
import PropTypes from 'prop-types';

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add a city by clicking on a city on the map." />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CityList;
