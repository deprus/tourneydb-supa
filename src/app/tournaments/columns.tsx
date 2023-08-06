'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
];
