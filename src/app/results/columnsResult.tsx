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

export type Result = {
  id?: string;
  result_place: number;
};

export const columnsResult: ColumnDef<Result>[] = [
  {
    accessorKey: 'tournament',
    header: 'Турнир',
    cell: ({ row }) => {
      if (
        typeof row === 'object' &&
        row !== null &&
        'getValue' in row &&
        typeof row.getValue === 'function'
      ) {
        const tournamentValue = row.getValue('tournament');
        if (
          typeof tournamentValue === 'object' &&
          tournamentValue !== null &&
          'tournament_name' in tournamentValue
        ) {
          return tournamentValue['tournament_name'];
        }
      }
    },
  },
  {
    accessorKey: 'player',
    header: 'Игрок',
    cell: ({ row }) => {
      if (
        typeof row === 'object' &&
        row !== null &&
        'getValue' in row &&
        typeof row.getValue === 'function'
      ) {
        const playerValue = row.getValue('player');
        if (
          typeof playerValue === 'object' &&
          playerValue !== null &&
          'player_nickname' in playerValue
        ) {
          return playerValue['player_nickname'];
        }
      }
    },
  },
  {
    accessorKey: 'result_place',
    header: 'Место',
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const deleteResult = useMutation({
        mutationFn: async (result: Result): Promise<any> => {
          console.log(result);
          const { error } = await supabase
            .from('result')
            .delete()
            .eq('id', result.id);
        },
        onSuccess: () => {
          toast({
            title: `Результат удален`,
            description: `${new Date().toLocaleString()}`,
          });
          queryClient.invalidateQueries({ queryKey: ['result'] });
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Не удалось удалить результат.',
            action: (
              <ToastAction altText="Try again">Попробуйте еще раз</ToastAction>
            ),
          });
        },
      });
      const result = row.original;

      return (
        <Dialog>
          <DialogContent>
            <UpdateTournament data={result} />
          </DialogContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => deleteResult.mutate(result)}>
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
