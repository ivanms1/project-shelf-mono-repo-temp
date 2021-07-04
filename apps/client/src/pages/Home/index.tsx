import { NetworkStatus } from '@apollo/client';
import { Waypoint } from 'react-waypoint';

import Cardtwo from '../../app/components/Cardv2';
import Spinner from '../../app/components/Spinner';
import Loader from '../../app/components/Loader';

import { useGetAllProjectsQuery } from '../../generated/generated';

import { Container, CardContainer } from './style';

function Home() {
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useGetAllProjectsQuery({
    variables: {
      cursor: undefined,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data) {
    return <Loader />;
  }

  if (error) {
    return <p>Sorry, something went wrong.</p>;
  }

  const onRefetch = () => {
    if (!data?.projects?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        cursor: data?.projects?.nextCursor,
      },
    });
  };

  return (
    <Container>
      <p>Welcome! Here are some recently submitted projects</p>
      <CardContainer>
        {networkStatus === NetworkStatus.setVariables ||
        networkStatus === NetworkStatus.refetch ||
        !data?.projects?.results?.length ? (
          <p className="noproject">No projects are currently live</p>
        ) : (
          data?.projects?.results.map((project) => (
            <Cardtwo key={project.id} project={project} />
          ))
        )}
      </CardContainer>
      {!loading && data?.projects?.nextCursor && (
        <Waypoint onEnter={onRefetch} bottomOffset="-20%" />
      )}

      {loading && data?.projects?.nextCursor && (
        <Spinner padding={20} type="black" />
      )}
    </Container>
  );
}

export default Home;
