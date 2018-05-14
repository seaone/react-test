import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../actions/userActions';
import Profile from '../components/Profile';

class ProfileContainer extends Component {
  static propTypes = {
    session: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
    user: PropTypes.shape({
      data: PropTypes.shape({}),
      isLoading: PropTypes.bool,
      errorMsg: PropTypes.string,
    }).isRequired,
    getUser: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { user: { id } } = this.props.session;

    if (id !== null) this.props.getUser(id);
  }

  render() {
    const { data, isLoading, errorMsg } = this.props.user;

    return (
      <Profile
        data={data}
        isLoading={isLoading}
        errorMsg={errorMsg}
      />
    );
  }
}

export default connect(
  state => ({
    session: state.session,
    user: state.user,
  }),
  dispatch => ({
    getUser(id) {
      dispatch(getUser(id));
    },
  }),
)(ProfileContainer);
