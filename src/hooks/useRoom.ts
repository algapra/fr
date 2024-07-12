import useSWR from 'swr';
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  Room,
} from '../services/rooms';
import { useEffect, useState } from 'react';
import { PaginationParam } from '@/@types/pagination';

export const useRoom = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState<Room | null>(null);
  const [filter, setFilter] = useState<PaginationParam<string>>({
    page: 1,
    size: 10,
    search: '',
  });

  const {
    data: rooms,
    error: fetchError,
    isLoading: fetchLoading,
    mutate: refreshRooms,
    isValidating,
  } = useSWR(['/rooms', filter], () => getRooms(filter));

  useEffect(() => {
    setIsLoading(fetchLoading);
    setError(fetchError);
    setIsFetching(isValidating);
  }, [fetchError, fetchLoading, isValidating]);

  return {
    rooms,
    error,
    isLoading,
    isFetching,
    refreshRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    room: data,
    setRoom: setData,
    filter,
    setFilter,
  };
};
