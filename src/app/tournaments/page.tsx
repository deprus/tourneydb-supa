'use client';

import axios from 'axios';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SheetAddTourney from '@/components/SheetAddTourney';

export default function DemoPage() {
  const { data, isLoading: isGetting } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3000/api/tournaments');
      return data;
    },
  });

  if (isGetting) return <h1>Loading...</h1>;

  return (
    <div className="container mx-auto py-10">
      <SheetAddTourney />
      <DataTable columns={columns} data={data.data} />
    </div>
  );
}
