import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { errors } from '../l10n';

export default function News({ data, isLoading, errorMsg }) {
  return (
    <div>
      <h1>Новости</h1>
      {data && <NewsContent data={data} />}

      {isLoading && <p>Загрузка...</p>}

      {errorMsg && <p>{errors[errorMsg] || errors.other}</p>}
    </div>
  );
}

News.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

News.defaultProps = {
  data: null,
};

function NewsContent({ data }) {
  if (data.length > 0) {
    return (
      <Fragment>
        {
          data.map(news => (
            <article key={news.id}>
              <h2>{news.title}</h2>
              <p>{news.text}</p>
            </article>
          ))
        }
        <div>Всего новостей: {data.length}</div>
      </Fragment>
    );
  }

  return (
    <p>Новостей нет</p>
  );
}

NewsContent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
