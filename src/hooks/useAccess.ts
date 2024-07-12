import useSWR from 'swr';
import {
  getAccesses,
  createAccess,
  updateAccess,
  deleteAccess,
  Access,
} from '../services/access';
import { useEffect, useState } from 'react';
import { PaginationParam } from '@/@types/pagination';

export const useAccess = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState<Access | null>(null);
  const [filter, setFilter] = useState<PaginationParam<string>>({
    page: 1,
    size: 10,
    search: '',
  });

  const {
    data: departments,
    error: fetchError,
    isLoading: fetchLoading,
    mutate: refreshAccesses,
    isValidating,
  } = useSWR(['/accesses', filter], () => getAccesses(filter));

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
    refreshAccesses,
    createAccess,
    updateAccess,
    deleteAccess,
    department: data,
    setAccess: setData,
    filter,
    setFilter,
  };
};
