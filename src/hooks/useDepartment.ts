import useSWR from 'swr';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  Department,
  checkDepartmentProperty,
} from '../services/departments';
import { useEffect, useState } from 'react';
import { PaginationParam } from '@/@types/pagination';

export const useDepartment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState<Department | null>(null);
  const [filter, setFilter] = useState<PaginationParam<string>>({
    page: 1,
    size: 10,
    search: '',
  });

  const {
    data: departments,
    error: fetchError,
    isLoading: fetchLoading,
    mutate: refreshDepartments,
    isValidating,
  } = useSWR(['/departments', filter], () => getDepartments(filter));

  useEffect(() => {
    setIsLoading(fetchLoading);
    setError(fetchError);
    setIsFetching(isValidating);
  }, [fetchError, fetchLoading, isValidating]);

  return {
    departments,
    error,
    isLoading,
    isFetching,
    refreshDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    checkDepartmentProperty,
    department: data,
    setDepartment: setData,
    filter,
    setFilter,
  };
};
