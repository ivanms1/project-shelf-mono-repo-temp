import React, { useMemo } from 'react';
import { NetworkStatus } from '@apollo/client';
import {
  useTable,
  useFlexLayout,
  usePagination,
  useResizeColumns,
} from 'react-table';

import Table from '../../../components/Table';

import {
  useGetAllApprovedProjectsQuery,
  useUpdateStatusMutation,
} from '../../../generated/generated';

import { Container, ActivatedContainer, ProjectCollection } from './style';

function Activated() {
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
  } = useGetAllApprovedProjectsQuery({
    variables: {
      cursor: undefined,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  const [updateStatus, { error: errorR }] = useUpdateStatusMutation();

  const columns: any = useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: function CreatedAt({
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

  async function updateProjectStatus(projectId: string) {
    try {
      await updateStatus({
        variables: {
          projectId: projectId,
          isApproved: false,
        },
      });
    } catch (error) {
      // handle error
    }
  }

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

  if (error || errorR) {
    return <p>Sorry, something went wrong.</p>;
  }

  return (
    <Container>
      <ActivatedContainer>
        <main>
          <h1>Approved Projects</h1>
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

export default Activated;
