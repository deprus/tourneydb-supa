'use client';

import axios from 'axios';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SheetAddTourney from '@/components/SheetAddTourney';
import supabase from '@/utils/supabase';

export default function DemoPage() {
  const { data, isLoading: isGetting } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase.from('Tournaments').select('*');

      if (error) {
        console.error(error);
        throw new Error('Tournaments could not be loaded');
      }

      return data;
    },
  });

  if (isGetting) return <h1>Loading...</h1>;

  const dataArray = data || [];

  return (
    <div className="container mx-auto py-10">
      <SheetAddTourney />
      <DataTable columns={columns} data={dataArray} />
    </div>
  );
}
