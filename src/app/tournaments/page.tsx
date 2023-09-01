'use client';

import { columnsTournaments } from './columnsTournament';
import { DataTable } from './data-table';
import { useQuery } from '@tanstack/react-query';
import SheetAddTourney from '@/app/tournaments/SheetAddTournament';
import { supabase } from '@/utils/supabase';
import { Skeleton } from '@/components/ui/skeleton';

export default function TournamentsPage() {
  const { data, isLoading: isGetting } = useQuery({
    queryKey: ['tournament'],
    queryFn: async () => {
      const { data, error } = await supabase.from('tournament').select('*');

      if (error) {
        console.error(error);
        throw new Error('Tournaments could not be loaded');
      }

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
      <SheetAddTourney />
      <DataTable columns={columnsTournaments} data={dataArray} />
    </div>
  );
}
