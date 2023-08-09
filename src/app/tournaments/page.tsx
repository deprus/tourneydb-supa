'use client';

import axios from 'axios';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SheetAddTourney from '@/components/SheetAddTourney';
import { supabase } from '@/utils/supabase';
import { Skeleton } from '@/components/ui/skeleton';

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

  if (isGetting)
    return (
      <div className=" flex items-center justify-center mt-20">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );

  const dataArray = data || [];

  return (
    <div className="container mx-auto py-10">
      <SheetAddTourney />
      <DataTable columns={columns} data={dataArray} />
    </div>
  );
}
