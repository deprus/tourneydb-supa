'use client';

import { columnsPlayers } from './columnsRatings';
import { DataTable } from './data-table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import { Skeleton } from '@/components/ui/skeleton';
import AddPlayer from '@/components/AddPlayer';
import SheetAddPlayer from '@/components/SheetAddPlayer';

export default function PlayersPage() {
  // const { data, isLoading: isGetting } = useQuery({
  //   queryKey: ['players'],
  //   queryFn: async () => {
  //     let { data: Players, error } = await supabase.from('Players').select('*');

  //     if (error) {
  //       console.error(error);
  //       throw new Error('Tournaments could not be loaded');
  //     }

  //     return Players;
  //   },
  // });

  // if (isGetting)
  //   return (
  //     <div className="flex items-center justify-center mt-20">
  //       <div className="flex items-center space-x-4">
  //         <Skeleton className="h-12 w-12 rounded-full" />
  //         <div className="space-y-2">
  //           <Skeleton className="h-4 w-[250px]" />
  //           <Skeleton className="h-4 w-[200px]" />
  //         </div>
  //       </div>
  //     </div>
  //   );

  const dataArray: any[] = [];

  return (
    <div className="container mx-auto py-10">
      {/* <SheetAddPlayer /> */}
      <DataTable columns={columnsPlayers} data={dataArray} />
    </div>
  );
}
