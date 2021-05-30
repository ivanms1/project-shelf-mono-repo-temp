import { SpinnerDiv, CircularLoader } from './style';

interface SpinnerProps {
  padding?: number;
  type?: string;
}

const Spinner = ({ type = 'white', padding = 0 }: SpinnerProps) => {
  return (
    <SpinnerDiv padding={padding}>
      <CircularLoader colors={type} />
    </SpinnerDiv>
  );
};

export default Spinner;
