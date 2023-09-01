'use client';

import { queryClient } from '@/components/Providers';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/utils/supabase';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToastAction } from '@/components/ui/toast';
import { useMutation } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import UpdatePlayer from './UpdatePlayer';

export interface Player {
  id?: string;
  player_name: string;
  player_middle_name: string;
  player_surname: string;
  player_nickname: string;
  player_image: string;
  player_gender: string;
  player_title: string;
  player_residence: string;
  player_title_date: Date;
  player_join_date: Date;
  player_district: string;
  player_mobile_number: string;
  player_mail: string;
  player_socials: string;
}

export const columnsPlayers: ColumnDef<Player>[] = [
  {
    accessorKey: 'player_name',
    header: 'Имя',
    cell: ({ row }) => (
      <Link href={`/players/${row.getValue('player_nickname')}`}>
        {row.getValue('player_name')}
      </Link>
    ),
  },

  {
    accessorKey: 'player_surname',
    header: 'Фамилия',
  },

  {
    accessorKey: 'player_middle_name',
    header: 'Отчество',
  },

  {
    accessorKey: 'player_nickname',
    header: 'Ник',
    cell: ({ row }) => (
      <Link href={`/players/${row.getValue('player_nickname')}`}>
        {row.getValue('player_nickname')}
      </Link>
    ),
  },

  {
    accessorKey: 'player_gender',
    header: 'Пол',
  },

  {
    accessorKey: 'player_title',
    header: 'Звание',
  },

  {
    accessorKey: 'player_residence',
    header: 'Место жительства',
  },

  {
    accessorKey: 'player_join_date',
    header: 'Вошел в клуб',
    cell: ({ row }: { row: any }) => {
      return <div>{row.getValue('player_join_date').slice(0, 10)}</div>;
    },
  },

  {
    accessorKey: 'player_title_date',
    header: 'Дата звания',
    cell: ({ row }: { row: any }) => {
      return <div>{row.getValue('player_title_date').slice(0, 10)}</div>;
    },
  },

  {
    accessorKey: 'player_district',
    header: 'Округ',
  },

  {
    accessorKey: 'player_mobile_number',
    header: 'Моб номер',
  },

  {
    accessorKey: 'player_mail',
    header: 'Почта',
  },

  {
    accessorKey: 'player_socials',
    header: 'Соц сети',
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const deletePlayer = useMutation({
        mutationFn: async (player: Player): Promise<any> => {
          const { error } = await supabase
            .from('player')
            .delete()
            .eq('id', player.id);
        },
        onSuccess: () => {
          toast({
            title: `Игрок ${player.player_name} удален`,
            description: `${new Date().toLocaleString()}`,
          });
          queryClient.invalidateQueries({ queryKey: ['player'] });
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Не удалось удалить игрока.',
            action: (
              <ToastAction altText="Try again">Попробуйте еще раз</ToastAction>
            ),
          });
        },
      });

      const player = row.original;

      return (
        <Dialog>
          <DialogContent>
            <UpdatePlayer data={player} />
          </DialogContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => deletePlayer.mutate(player)}>
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

// export const columnsPlayers: ColumnDef<Player>[] = [
//   {
//     accessorKey: 'place',
//     header: '',
//     cell: ({ table, row }) => {
//       const sorted = table
//         .getRowModel()
//         .rows.sort((a, b) => b.original.rating - a.original.rating);

//       const item = sorted.find(
//         (i) => i.original.nickname === row.getValue('nickname')
//       );
//       let index;

//       if (item) {
//         index = sorted.indexOf(item) + 1;
//       }
//       return <div>{index}</div>;
//     },
//   },
//   {
//     accessorKey: 'name',
//     header: 'Игрок',
//     cell: ({ row }) => (
//       <Link href={`/players/${row.getValue('nickname')}`}>
//         {row.getValue('name')}
//       </Link>
//     ),
//   },

//   {
//     accessorKey: 'nickname',
//     header: 'Ник',
//   },
//   {
//     accessorKey: 'rating',
//     header: 'Рейтинг',
//   },

//   {
//     accessorKey: 'tourneys',
//     header: 'Турниров',
//   },
//   {
//     accessorKey: 'gold',
//     header: () => <div className="text-2xl">🥇</div>,
//   },
//   {
//     accessorKey: 'silver',
//     header: () => <div className="text-2xl">🥈</div>,
//   },
//   {
//     accessorKey: 'bronze',
//     header: () => <div className="text-2xl">🥉</div>,
//   },
//   {
//     accessorKey: 'totalMatches',
//     header: 'Матчей',
//   },
//   {
//     accessorKey: 'wins',
//     header: 'Побед',
//   },
//   {
//     accessorKey: 'winsPerc',
//     header: 'Процент побед',
//   },
//   {
//     id: 'actions',
//     enableHiding: false,
//     cell: ({ row }) => {
//       // eslint-disable-next-line react-hooks/rules-of-hooks
//       const mutation = useMutation({
//         mutationFn: async (player: Player): Promise<any> => {
//           const { error } = await supabase
//             .from('Players')
//             .delete()
//             .eq('id', player.id);
//         },
//         onSuccess: () => {
//           toast({
//             title: `Игрок ${player.name} удален`,
//             description: `${new Date().toLocaleString()}`,
//           });
//           queryClient.invalidateQueries({ queryKey: ['players'] });
//         },
//         onError: () => {
//           toast({
//             variant: 'destructive',
//             title: 'Не удалось удалить игрока.',
//             action: (
//               <ToastAction altText="Try again">Попробуйте еще раз</ToastAction>
//             ),
//           });
//         },
//       });

//       const player = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={() => mutation.mutate(player)}>
//               Удалить
//             </DropdownMenuItem>
//             <DropdownMenuItem>Изменить</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];
