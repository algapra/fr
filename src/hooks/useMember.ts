import useSWR from 'swr';
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  checkMemberProperty,
  Member,
} from '../services/member';
import { useEffect, useState } from 'react';
import { PaginationParam } from '@/@types/pagination';

export const useMember = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState<Member | null>(null);
  const [filter, setFilter] = useState<PaginationParam<string>>({
    page: 1,
    size: 10,
    search: '',
  });

  const {
    data: members,
    error: fetchError,
    isLoading: fetchLoading,
    mutate: refreshMembers,
    isValidating,
  } = useSWR(['/members', filter], () => getMembers(filter));

  useEffect(() => {
    setIsLoading(fetchLoading);
    setError(fetchError);
    setIsFetching(isValidating);
  }, [fetchError, fetchLoading, isValidating]);

  return {
    members,
    error,
    isLoading,
    isFetching,
    refreshMembers,
    createMember,
    updateMember,
    deleteMember,
    checkMemberProperty,
    department: data,
    setMember: setData,
    filter,
    setFilter,
  };
};
