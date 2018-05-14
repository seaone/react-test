import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/sessionActions';
import { Button, ButtonLink } from './lib/Button';

class LoginButton extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    session: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
  }

  handleClick = () => {
    if (this.props.session.user.id) {
      this.props.logout();
    } else {
      this.setRedirect();
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.session.user.id ?
          <Button
            type="button"
            onClick={this.handleClick}
          >
            Выйти
          </Button> :

          <ButtonLink
            to="/login"
          >
            Войти
          </ButtonLink>
        }
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    session: state.session,
  }),
  dispatch => ({
    logout() {
      dispatch(logout());
    },
  }),
)(LoginButton);
