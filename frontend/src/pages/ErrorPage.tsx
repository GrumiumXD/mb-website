import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Container } from '../components/Parts';

type Props = {};

const errorPage = (props: Props) => {
  const error = useRouteError() as Error;
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <Container>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </Container>
    );
  } else {
    return <Container>Oops</Container>;
  }
};

export default errorPage;
