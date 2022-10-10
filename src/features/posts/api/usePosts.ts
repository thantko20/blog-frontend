import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TFieldNameFilters, TSortOrder } from '../../type';
import { IPost } from '../types';

// Note: Filters will be refactored
// due to its unecessary complexities.

interface IPostFilters {
  fieldName?: TFieldNameFilters;
  sortOrder?: TSortOrder;
}

const getPosts = async ({
  fieldName,
  sortOrder,
}: IPostFilters): Promise<IPost[]> => {
  const res = await fetch(
    `/api/posts?fieldName=${fieldName}&sortOrder=${sortOrder}`
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
