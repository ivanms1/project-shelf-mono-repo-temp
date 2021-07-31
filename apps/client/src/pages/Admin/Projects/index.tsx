import { useMemo } from 'react';
import { NetworkStatus } from '@apollo/client';
import {
  useTable,
  useFlexLayout,
  usePagination,
  useResizeColumns,
} from 'react-table';

import Table from '../../../components/Table';

import {
  useGetProjectsAdminQuery,
  useUpdateStatusMutation,
} from '../../../generated/generated';

import { Container, ActivatedContainer, ProjectCollection } from './style';

function UpdateStatusButton({
  isApproved,
  projectId,
}: {
  isApproved: boolean;
  projectId: string;
}) {
  const [updateStatus] = useUpdateStatusMutation();

  const handleUpdate = async () => {
    try {
      await updateStatus({
        variables: {
          projectId,
          isApproved: !isApproved,
        },
      });
    } catch (error) {
      // handle error
    }
  };
  return isApproved ? (
    <button onClick={() => handleUpdate()}>dissaprove</button>
  ) : (
    <button onClick={() => handleUpdate()}>approve</button>
  );
}

function Projects() {
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useGetProjectsAdminQuery({
    variables: {
      cursor: undefined,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const columns: any = useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: function Title({
          cell: { value: createdAt },
        }: {
          cell: { value: string };
        }) {
          return <>{new Date(createdAt).toLocaleDateString()}</>;
        },
      },
      {
        Header: 'Author',
        accessor: 'author.name',
      },
      {
        Header: 'Status',
        accessor: 'isApproved',
        Cell: function Status({
          row: { original },
          cell: { value },
        }: {
          row: { original: { id: string } };
          cell: { value: boolean };
        }) {
          return (
            <UpdateStatusButton isApproved={value} projectId={original.id} />
          );
        },
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data:
        networkStatus === NetworkStatus.setVariables ||
        networkStatus === NetworkStatus.refetch ||
        !data?.projects?.results?.length
          ? []
          : data?.projects?.results,
    },
    useFlexLayout,
    useResizeColumns,
    usePagination
  );

  const onRefetch = async () => {
    if (!data?.projects?.nextCursor) {
      return;
    }

    if (data?.projects?.results?.length === data?.projects?.totalCount) {
      return;
    }

    try {
      await fetchMore({
        variables: {
          cursor: data?.projects?.nextCursor,
        },
      });
    } catch (error) {
      // TODO: handle error
    }
  };

  if (error) {
    return <p>Sorry, something went wrong.</p>;
  }

  return (
    <Container>
      <ActivatedContainer>
        <main>
          <h1>Projects</h1>
          <ProjectCollection>
            <Table
              instance={tableInstance}
              onFetchMore={onRefetch}
              loading={loading}
            />
          </ProjectCollection>
        </main>
      </ActivatedContainer>
    </Container>
  );
}

export default Projects;
