import styled from 'styled-components';

import { Audio } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Container = styled.div`
  display: grid;
  place-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
`;

const ContainerFullscreen = styled(Container)`
  height: 100vh;
`;

type Props = {};

export const LoaderFullscreen = (props: Props) => {
  return (
    <ContainerFullscreen>
      <Audio color="orange" />
    </ContainerFullscreen>
  );
};

export const LoaderMedium = (props: Props) => {
  return (
    <Container>
      <Audio color="orange" width="40" />
    </Container>
  );
};
