'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

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
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },

  {
    accessorKey: 'nickname',
    header: 'Ник',
  },
  {
    accessorKey: 'rating',
    header: 'Рейтинг',
  },

  {
    accessorKey: 'tourneys',
    header: 'Турниров',
  },
  {
    accessorKey: 'gold',
    header: () => <div className="text-2xl">🥇</div>,
  },
  {
    accessorKey: 'silver',
    header: () => <div className="text-2xl">🥈</div>,
  },
  {
    accessorKey: 'bronze',
    header: () => <div className="text-2xl">🥉</div>,
  },
  {
    accessorKey: 'matches',
    header: 'Матчей',
  },
  {
    accessorKey: 'wins',
    header: 'Побед',
  },
  {
    accessorKey: 'winsPerc',
    header: 'Процент побед',
  },
];
