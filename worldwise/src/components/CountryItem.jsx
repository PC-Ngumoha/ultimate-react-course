import styles from './CountryItem.module.css';
import PropTypes from 'prop-types';
// import { convertToEmoji } from '../utils';

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

CountryItem.propTypes = {
  country: {
    emoji: PropTypes.string,
    country: PropTypes.string,
  },
};

export default CountryItem;
