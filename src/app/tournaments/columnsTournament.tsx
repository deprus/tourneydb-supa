'use client';

import { queryClient } from '@/components/Providers';
import UpdateTournament from '@/app/tournaments/UpdateTournament';
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
  tournament_series: string;
  tournament_name: string;
  tournament_num_players: number;
  tournament_end_date: Date;
  tournament_match_length: number;
};

export const columnsTournaments: ColumnDef<Tournament>[] = [
  {
    accessorKey: 'tournament_series',
    header: 'Серия',
  },
  {
    accessorKey: 'tournament_name',
    header: 'Турнир',
  },
  {
    accessorKey: 'tournament_num_players',
    header: 'Участников',
  },
  {
    accessorKey: 'tournament_end_date',
    header: 'Финиш',
  },
  {
    accessorKey: 'tournament_match_length',
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
            title: `Турнир ${tournament.tournament_name} удален`,
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
