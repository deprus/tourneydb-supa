'use client';

import { columnsResult } from './columnsResult';
import { DataTable } from './data-table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import SheetAddResult from '@/app/results/SheetAddResult';

export default function ResultsPage() {
  const { data, isLoading: isGetting } = useQuery({
    queryKey: ['result'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('result')
        .select(
          `id, result_place, player(player_nickname), tournament(tournament_name)`
        );

      if (error) {
        console.error(error);
        throw new Error('Results could not be loaded');
      }
      console.log(data);
      return data;
    },
  });

  if (isGetting)
    return (
      <div className="flex items-center justify-center mt-20">
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
      <SheetAddResult />
      <DataTable columns={columnsResult} data={dataArray} />
    </div>
  );
}
