import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '../../app/components/Button';

import { useAppContext } from '../../app/Context/AppContext';
import { useRegisterUserMutation } from '../../generated/generated';

import Light from '../../assets/light.svg';

import {
  Container,
  RegisterBox,
  InputContainer,
  Input,
  LoginLink,
  ErrorText,
  CustomRegisterCss,
} from './style';

const requiredError = 'This field is required';
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(requiredError)
    .min(3, 'First name must have more than 3 characters'),
  email: yup.string().required(requiredError).email('Email must be valid'),
  password: yup
    .string()
    .required(requiredError)
    .min(6, 'Password must be more than 6 characters'),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
};

function Register() {
  const { handleLogin } = useAppContext();
  const { register, handleSubmit, errors } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const [registerUser, { loading }] = useRegisterUserMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await registerUser({
        variables: {
          email: data.email,
          password: data.password,
          name: data.firstName,
        },
      });
      if (res?.data?.signup?.userId) {
        handleLogin(res?.data?.signup?.userId);
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <Container>
      <img alt="light" src={Light}></img>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisterBox>
          <span>Register</span>
          <InputContainer>
            <label>First name</label>
            <Input name="firstName" placeholder="Joe" ref={register} />
            <ErrorMessage errors={errors} name="firstName" as={<ErrorText />} />
          </InputContainer>
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
          <InputContainer>
            <label>Confirm Password</label>
            <Input name="confirmPassword" type="password" ref={register} />
            <ErrorMessage
              errors={errors}
              name="confirmPassword"
              as={<ErrorText />}
            />
          </InputContainer>
          <LoginLink to="/login">Login?</LoginLink>
          <Button addCSS={CustomRegisterCss} loading={loading} type="submit">
            Register
          </Button>
        </RegisterBox>
      </form>
    </Container>
  );
}

export default Register;
