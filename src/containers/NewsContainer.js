import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNews } from '../actions/newsActions';
import News from '../components/News';

class NewsContainer extends Component {
  static propTypes = {
    news: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
      isLoading: PropTypes.bool,
      errorMsg: PropTypes.string,
    }).isRequired,
    getNews: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getNews();
  }

  render() {
    const { data, isLoading, errorMsg } = this.props.news;

    return (
      <News
        data={data}
        isLoading={isLoading}
        errorMsg={errorMsg}
      />
    );
  }
}

export default connect(
  state => ({
    news: state.news,
  }),
  dispatch => ({
    getNews() {
      dispatch(getNews());
    },
  }),
)(NewsContainer);
