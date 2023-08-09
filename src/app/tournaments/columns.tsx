'use client';

import { queryClient } from '@/components/Providers';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/utils/supabase';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export type Tournament = {
  id: string;
  series: string;
  tournament: string;
  numPlayers: number;
  status: 'объявлен' | 'идет' | 'закончен' | 'регистрация';
  ended: string;
  champion: string;
  nickname: string;
  totalWins: number;
};

export const columns: ColumnDef<Tournament>[] = [
  {
    accessorKey: 'series',
    header: 'Серия',
  },
  {
    accessorKey: 'tournament',
    header: 'Турнир',
  },
  {
    accessorKey: 'numPlayers',
    header: 'Участников',
  },
  {
    accessorKey: 'status',
    header: 'Статус',
  },
  {
    accessorKey: 'ended',
    header: 'Финиш',
  },
  {
    accessorKey: 'champion',
    header: 'Чемпион',
  },
  {
    accessorKey: 'nickname',
    header: 'Ник на героях',
  },
  {
    accessorKey: 'totalWins',
    header: 'Счетчик',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const mutation = useMutation({
        mutationFn: async (id): Promise<any> => {
          const { error } = await supabase
            .from('Tournaments')
            .delete()
            .eq('id', id);
        },
        onSuccess: () => {
          toast({
            title: 'Турнир удален',
            description: `${new Date().toLocaleString()}`,
          });
          queryClient.invalidateQueries({ queryKey: ['tournaments'] });
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
      console.log(tournament);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => mutation.mutate(tournament.id)}>
              Удалить
            </DropdownMenuItem>
            <DropdownMenuItem>Изменить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
