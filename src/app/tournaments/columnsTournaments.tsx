'use client';

import { queryClient } from '@/components/Providers';
import UpdateTournament from '@/components/UpdateTournaments';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/utils/supabase';
import { useMutation } from '@tanstack/react-query';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export type Tournament = {
  id?: string;
  series: string;
  name: string;
  num_players: number;
  end_date: Date;
  match_length: number;
};

export const columnsTournaments: ColumnDef<Tournament>[] = [
  {
    accessorKey: 'series',
    header: 'Серия',
  },
  {
    accessorKey: 'name',
    header: 'Турнир',
  },
  {
    accessorKey: 'num_players',
    header: 'Участников',
  },
  {
    accessorKey: 'end_date',
    header: 'Финиш',
  },
  {
    accessorKey: 'match_length',
    header: 'Длина матчей',
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const deleteTournament = useMutation({
        mutationFn: async (tournament: Tournament): Promise<any> => {
          const { error } = await supabase
            .from('tournament')
            .delete()
            .eq('id', tournament.id);
        },
        onSuccess: () => {
          toast({
            title: `Турнир ${tournament.name} удален`,
            description: `${new Date().toLocaleString()}`,
          });
          queryClient.invalidateQueries({ queryKey: ['tournament'] });
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Не удалось удалить турнир.',
            action: (
              <ToastAction altText="Try again">Попробуйте еще раз</ToastAction>
            ),
          });
        },
      });
      const tournament = row.original;

      return (
        <Dialog>
          <DialogContent>
            <UpdateTournament data={tournament} />
          </DialogContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => deleteTournament.mutate(tournament)}
              >
                Удалить
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>Изменить</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];
