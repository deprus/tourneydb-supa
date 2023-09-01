'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

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
  // {
  //   accessorKey: 'place',
  //   header: '',
  //   cell: ({ table, row }) => {
  //     const sorted = table
  //       .getRowModel()
  //       // .rows.sort((a, b) => b.original.rating - a.original.rating);

  //     const item = sorted.find(
  //       (i) => i.original.nickname === row.getValue('nickname')
  //     );
  //     let index;

  //     if (item) {
  //       index = sorted.indexOf(item) + 1;
  //     }
  //     return <div>{index}</div>;
  //   },
  // },
  {
    accessorKey: 'name',
    header: 'Игрок',
    cell: ({ row }: { row: any }) => {
      return (
        <div>{`${row.original.player_name} ${row.original.player_surname}`}</div>
      );
    },
  },

  {
    accessorKey: 'player_nickname',
    header: 'Ник',
  },
  {
    accessorKey: 'player_rating',
    header: 'Рейтинг',
  },

  {
    accessorKey: 'player_tourneys',
    header: 'Турниров',
  },
  {
    accessorKey: 'player_gold',
    header: () => <div className="text-2xl">🥇</div>,
  },
  {
    accessorKey: 'player_silver',
    header: () => <div className="text-2xl">🥈</div>,
  },
  {
    accessorKey: 'player_bronze',
    header: () => <div className="text-2xl">🥉</div>,
  },
  {
    accessorKey: 'player_matches',
    header: 'Матчей',
  },
  {
    accessorKey: 'player_player_wins',
    header: 'Побед',
  },
  {
    accessorKey: 'player_winsPerc',
    header: 'Процент побед',
  },
];
