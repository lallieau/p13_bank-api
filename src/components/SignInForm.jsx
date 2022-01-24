import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useSelector, useStore} from 'react-redux';
import {selectToken} from '../utils/selectors';
import fetchToken from '../utils/fetchData/fetchToken';
import {Navigate} from 'react-router-dom';

const Form = styled.form``;
const Button = styled(Link)`
  display: block;
  width: 100%;
  padding: 8px;
  font-size: ${({theme}) => theme.fontSize.xs};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  margin-top: 1rem;
  border-color: ${({theme}) => theme.colors.primary};
  background-color: ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.tertiary};
`;

const Field = styled.div`
  display: flex;
  flex-direction: ${({theme}) => theme.inputDirection.default};
  text-align: left;
  margin-bottom: 1rem;
`;
const Label = styled.label`
  font-weight: ${({theme}) => theme.fontWeight.bold};
`;
const Input = styled.input`
  padding: 5px;
  font-size: ${({theme}) => theme.fontSize.sm};
`;

/**
 * Renders Sign In Form
 * @returns {JSX}
 */
export const SignInForm = () => {
  const {isLoading, isLoggedIn, isError} = useSelector(selectToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const store = useStore();

  useEffect(() => {
    // if user chose to be remembered then retrieve username from local storage
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const user = rememberMe ? localStorage.getItem('user') : '';
    setEmail(user);
    setRememberMe(rememberMe);
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    // if user chooses to be remembered then save to local storage
    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('user', rememberMe ? email : '');
    // get authentication 'token' from API
    fetchToken(store, email, password);
  };

  if (isLoggedIn) return <Navigate to="/user/profile" replace={true} />;

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          onChange={e => {
            setEmail(e.target.value);
          }}
          disabled={isLoading ? true : false}
        />
      </Field>

      <Field>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          onChange={e => {
            setPassword(e.target.value);
          }}
          disabled={isLoading ? true : false}
        />
      </Field>

      <Field theme={{inputDirection: 'row'}}>
        <Input
          type="checkbox"
          id="remember-me"
          onChange={() => setRememberMe(!rememberMe)}
        />
        <Label
          htmlFor="remember-me"
          style={{
            marginLeft: '0.25rem',
            fontWeight: ({theme}) => theme.fontWeight.regular,
          }}>
          Remember me
        </Label>
      </Field>
      {isLoading && 'Loading...'}
      <p>{isError}</p>
      <Button type="submit" disabled={isLoading ? true : false}>
        Sign In
      </Button>
    </Form>
  );
};
