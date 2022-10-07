import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { ZodError } from 'zod';

import { Container } from '../components/Parts';

const isZodError = (e: any): e is ZodError => {
  return e.hasOwnProperty('issues');
};

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
  } else if (isZodError(error)) {
    return (
      <Container>
        <h1>Oops!</h1>
        <h2>Schema Error</h2>
        <>
          {error.issues.map((i, index) => (
            <p key={index}>{JSON.stringify(i)}</p>
          ))}
        </>
      </Container>
    );
  } else {
    return <Container>Oops</Container>;
  }
};

export default errorPage;
