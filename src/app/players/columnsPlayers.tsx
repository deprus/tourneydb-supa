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

export interface Player {
  id?: string;
  name: string;
  middle_name: string;
  surname: string;
  nickname: string;
  image: string;
  gender: string;
  title: string;
  residence: string;
  title_date: Date;
  join_date: Date;
  district: string;
  mobile_number: string;
  mail: string;
  socials: string;
}

export const columnsPlayers: ColumnDef<Player>[] = [
  {
    accessorKey: 'name',
    header: 'Имя',
  },

  {
    accessorKey: 'surname',
    header: 'Фамилия',
  },

  {
    accessorKey: 'middle_name',
    header: 'Отчество',
  },

  {
    accessorKey: 'nickname',
    header: 'Ник',
  },

  {
    accessorKey: 'gender',
    header: 'Пол',
  },

  {
    accessorKey: 'title',
    header: 'Звание',
  },

  {
    accessorKey: 'residence',
    header: 'Место жительства',
  },

  {
    accessorKey: 'title_date',
    header: 'Дата звания',
    cell: ({ row }: { row: any }) => {
      return <div>{row.getValue('join_date').slice(0, 10)}</div>;
    },
  },

  {
    accessorKey: 'join_date',
    header: 'Вошел в клуб',
    cell: ({ row }: { row: any }) => {
      return <div>{row.getValue('join_date').slice(0, 10)}</div>;
    },
  },

  {
    accessorKey: 'district',
    header: 'Округ',
  },

  {
    accessorKey: 'mobile_number',
    header: 'Моб номер',
  },

  {
    accessorKey: 'mail',
    header: 'Почта',
  },

  {
    accessorKey: 'socials',
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
            title: `Игрок ${player.name} удален`,
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

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const updatePlayer = useMutation({
        mutationFn: async (player: Player): Promise<any> => {
          const { data, error } = await supabase
            .from('player')
            .update({
              name: player.name,
              surname: player.surname,
              middle_name: player.middle_name,
              nickname: player.nickname,
              image: player.image,
              gender: player.gender,
              title: player.title,
              residence: player.residence,
              title_date: player.title_date,
              join_date: player.join_date,
              district: player.district,
              mobile_number: player.mobile_number,
              mail: player.mail,
              socials: player.socials,
            })
            .eq('id', player.id)
            .select();
        },
        onSuccess: () => {
          toast({
            title: `Игрок ${player.name} изменен`,
            description: `${new Date().toLocaleString()}`,
          });
          queryClient.invalidateQueries({ queryKey: ['player'] });
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Не удалось изменить игрока.',
            action: (
              <ToastAction altText="Try again">Попробуйте еще раз</ToastAction>
            ),
          });
        },
      });

      const player = row.original;

      return (
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
            <DropdownMenuItem onClick={() => updatePlayer.mutate(player)}>
              Изменить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
