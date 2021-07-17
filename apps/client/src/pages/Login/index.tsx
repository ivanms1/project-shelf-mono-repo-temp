import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '../../components/Button';

import { useAppContext } from '../../Context/AppContext';
import { useLoginUserMutation } from '../../generated/generated';

import Rocket from '../../assets/rocket.svg';

import {
  Container,
  LoginBox,
  Form,
  InputContainer,
  Input,
  ErrorText,
  RegisterLink,
  CustomLoginCss,
} from './style';

const requiredError = 'This field is required';

const validationSchema = yup.object().shape({
  email: yup.string().required(requiredError).email('Email must be valid'),
  password: yup.string().required(requiredError),
});

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const { handleLogin } = useAppContext();

  const { register, errors, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const [loginUser, { loading }] = useLoginUserMutation();

  const submitUserDetails: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      handleLogin(response?.data?.login?.userId);
    } catch (error) {
      toast.error('Please try again.');
    }
  };

  return (
    <Container>
      <img alt="rocket" src={Rocket}></img>

      <LoginBox>
        <Form onSubmit={handleSubmit(submitUserDetails)}>
          <span>Login</span>

          <InputContainer>
            <label>Email Address</label>
            <Input name="email" ref={register} />

            <ErrorMessage errors={errors} name="email" as={<ErrorText />} />
          </InputContainer>

          <InputContainer>
            <label>Password</label>
            <Input name="password" type="password" ref={register} />

            <ErrorMessage errors={errors} name="password" as={<ErrorText />} />
          </InputContainer>

          <RegisterLink to="/register">Register ?</RegisterLink>

          <Button addCSS={CustomLoginCss} type="submit" loading={loading}>
            Login
          </Button>
        </Form>
      </LoginBox>
    </Container>
  );
}

export default Login;
