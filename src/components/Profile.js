import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { errors } from '../l10n';

export default function Profile({ data, isLoading, errorMsg }) {
  return (
    <div>
      <h1>Профиль</h1>
      {data && <ProfileContent data={data} />}

      {isLoading && <p>Загрузка...</p>}

      {errorMsg && <p>{errors[errorMsg] || errors.other}</p>}
    </div>
  );
}

Profile.propTypes = {
  data: PropTypes.shape({}),
  isLoading: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

Profile.defaultProps = {
  data: null,
};

function ProfileContent({ data }) {
  return (
    <div>
      {
        data.city &&
        <p>Город: {data.city}</p>
      }

      {
        data.languages.length > 0 &&
        <Fragment>
          <p>Знание языков:</p>

          <ul>
            {data.languages.map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
        </Fragment>
      }

      {
        data.social.length > 0 &&
        <Fragment>
          <p>Ссылки:</p>

          <ul>
            {
              data.social
                .reduce((arr, socItem) => (
                  socItem.label === 'web' ? [socItem, ...arr] : [...arr, socItem] // перемещение 'web' в начало массива
                ), [])
                .map(socItem => (
                  <li key={socItem.label}>
                    <a href={socItem.link} target="_blank">
                      <img
                        src={`/icons/${socItem.label}.png`}
                        width="24"
                        height="24"
                        title={socItem.label}
                        alt={socItem.label}
                      />
                    </a>
                  </li>
                ))
            }
          </ul>
        </Fragment>
      }
    </div>
  );
}

ProfileContent.propTypes = {
  data: PropTypes.shape({}).isRequired,
};
