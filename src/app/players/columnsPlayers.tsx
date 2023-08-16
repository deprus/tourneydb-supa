'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export interface Player {
  name: string;
  nickname: string;
  rating: number;
  image: string;
  tourneys: number;
  gold: number;
  silver: number;
  bronze: number;
  totalMatches: number;
  wins: number;
  winsPerc: number;
}

export const columnsPlayers: ColumnDef<Player>[] = [
  {
    accessorKey: 'place',
    header: '',
    cell: ({ table, row }) => {
      const sorted = table
        .getRowModel()
        .rows.sort((a, b) => b.original.rating - a.original.rating);

      const item = sorted.find(
        (i) => i.original.nickname === row.getValue('nickname')
      );
      let index;

      if (item) {
        index = sorted.indexOf(item) + 1;
      }
      return <div>{index}</div>;
    },
  },
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
    accessorKey: 'totalMatches',
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
