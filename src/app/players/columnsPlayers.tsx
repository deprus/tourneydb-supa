'use client';

import { ColumnDef } from '@tanstack/react-table';

export interface Player {
  place: string;
  name: string;
  nickname: string;
  rating: number;
  image: string;
  tourneys: number;
  gold: number;
  silver: number;
  bronze: number;
  matches: number;
  wins: number;
  winsPerc: number;
  lastT: string;
}

export const columnsPlayers: ColumnDef<Player>[] = [
  {
    accessorKey: 'place',
    header: 'Место',
  },
  {
    accessorKey: 'name',
    header: 'Игрок',
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
    header: 'Золото',
  },
  {
    accessorKey: 'silver',
    header: 'Серебро',
  },
  {
    accessorKey: 'bronze',
    header: 'Бронза',
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
  {
    accessorKey: 'lastT',
    header: 'Последний турнир',
  },
];
