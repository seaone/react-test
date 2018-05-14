import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TextInput from '../components/lib/TextInput';
import { Button } from '../components/lib/Button';
import { login, authHasErrored } from '../actions/sessionActions';
import { errors } from '../l10n';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    authHasErrored: PropTypes.func.isRequired,
    session: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number,
      }),
    }).isRequired,
    location: PropTypes.shape({}),
  }

  static defaultProps = {
    location: undefined,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { session: { errorMsg } } = nextProps;

    if (errorMsg === 'wrong_email_or_password') {
      return {
        ...prevState,
        password: '',
      };
    }

    return null;
  }

  state = {
    email: '',
    password: '',
  }

  handleSubmitForm(event) {
    event.preventDefault();

    const reg = /.+@.+\..+/i;

    if (!reg.test(this.state.email)) {
      this.props.authHasErrored('wrong_email');
      return;
    }

    this.props.login(this.state);
  }

  handleChangeInput(event) {
    const { target: { name, value } } = event;

    this.setState(() => (
      {
        [name]: value,
      }
    ));
  }

  render() {
    const { location, session: { isLoading, errorMsg, user } } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { email, password } = this.state;

    if (user.id !== null) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h1>Вход</h1>

        <form>
          {errorMsg && <p>{errors[errorMsg] || errors.other}</p>}

          <TextInput
            type="text"
            placeholder="email"
            name="email"
            onChange={event => this.handleChangeInput(event)}
            value={email}
          />

          <TextInput
            type="password"
            placeholder="Password"
            name="password"
            onChange={event => this.handleChangeInput(event)}
            value={password}
          />

          <Button
            type="submit"
            disabled={isLoading}
            onClick={event => this.handleSubmitForm(event)}
          >
            { isLoading ? 'Подождите' : 'Войти'}
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({
    session: state.session,
  }),
  dispatch => ({
    login(body) {
      dispatch(login(body));
    },
    authHasErrored(error) {
      dispatch(authHasErrored(error));
    },
  }),
)(Login);
