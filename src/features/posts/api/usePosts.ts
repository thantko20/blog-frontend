import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TFieldNameFilters, TSortOrder } from '../../type';
import { IPost } from '../types';

const sortOrders = {
  desc: -1,
  asc: 1,
};

// Note: Filters will be refactored
// due to its unecessary complexities.

interface IPostFilters {
  fieldName?: TFieldNameFilters;
  sortOrder?: keyof typeof sortOrders;
}

const getPosts = async ({
  fieldName = 'createdAt',
  sortOrder = 'desc',
}: IPostFilters): Promise<IPost[]> => {
  const res = await fetch(
    `/api/posts?fieldName=${fieldName}&sortOrder=${sortOrders[sortOrder]}`,
  );
  const data = await res.json();

  return data.data as IPost[];
};

export const usePosts = () => {
  const [filters, setFilters] = useState<IPostFilters>({
    fieldName: 'createdAt',
    sortOrder: 'desc',
  });

  const setFieldNameFilters = (fieldName: TFieldNameFilters) =>
    setFilters((prev) => ({ ...prev, fieldName }));

  const setSortOrderFilters = (sortOrder: TSortOrder) =>
    setFilters((prev) => ({ ...prev, sortOrder }));

  const query = useQuery(['posts', filters], () => getPosts(filters));

  return { ...query, setFieldNameFilters, setSortOrderFilters };
};
