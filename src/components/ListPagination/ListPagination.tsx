import React from 'react';
import { Pagination } from '@mui/material';

interface IProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
}

export const ListPagination = ({ currentPage, pageSize, totalCount, onPageChange }: IProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      shape="circular"
      size="medium"
      siblingCount={1} // Number of pages to show on each side
      boundaryCount={1} // Number of pages to show at the beginning and end
      sx={{ p: 2 }}
    />
  );
};
