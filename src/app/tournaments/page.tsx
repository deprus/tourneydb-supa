'use client';

import axios from 'axios';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useQuery } from '@tanstack/react-query';

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
      <DataTable columns={columns} data={data.data} />
    </div>
  );
}
