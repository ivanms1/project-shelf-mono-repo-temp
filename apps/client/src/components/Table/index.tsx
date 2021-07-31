import React from 'react';
import { Waypoint } from 'react-waypoint';
import { HeaderGroup, Row } from 'react-table';

import Spinner from '../Spinner';

import { TableContainer } from './styles';

interface TableProps {
  instance: any;
  hasPagination?: boolean;
  hasMore?: boolean;
  loading?: boolean;
  onFetchMore?: () => void;
  onClickRow?: (data: any) => void;
}

const Table: React.FunctionComponent<TableProps> = ({
  instance: {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
  },
  loading,
  hasPagination,
  hasMore,
  onFetchMore,
  onClickRow,
}) => {
  return (
    <TableContainer>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup) => {
            const {
              key: rowKey,
              ...rowProps
            } = headerGroup.getHeaderGroupProps();

            return (
              <tr key={rowKey} {...rowProps}>
                {headerGroup.headers.map((column: any) => {
                  const {
                    key: cellKey,
                    ...cellProps
                  } = column.getHeaderProps();
                  return (
                    <th key={cellKey} {...cellProps}>
                      {column.render('Header')}
                      <div {...column.getResizerProps()} />
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        {hasPagination && (
          <tbody {...getTableBodyProps()}>
            {rows.map((row: Row) => {
              prepareRow(row);
              const { key: rowKey, ...rowProps } = row.getRowProps();

              return (
                <tr
                  key={rowKey}
                  {...rowProps}
                  onClick={() => onClickRow && onClickRow(row.original)}
                >
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps();
                    return (
                      <td key={cellKey} {...cellProps}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {!loading && hasMore && (
              <Waypoint onEnter={onFetchMore} bottomOffset="-50%" />
            )}
            {loading && <Spinner />}
          </tbody>
        )}
        {!hasPagination && (
          <tbody {...getTableBodyProps()}>
            {rows.map((row: Row) => {
              prepareRow(row);
              const { key: rowKey, ...rowProps } = row.getRowProps();

              return (
                <tr key={rowKey} {...rowProps}>
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps();
                    return (
                      <td key={cellKey} {...cellProps}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {loading && (
              <tr>
                <Spinner />
              </tr>
            )}
          </tbody>
        )}
      </table>
    </TableContainer>
  );
};

export default Table;
