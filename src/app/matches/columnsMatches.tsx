'use client';

import { ColumnDef } from '@tanstack/react-table';

export interface Match {
  id: number;
  created_at: Date;
  match_time: Date;
  player1_id: number;
  player2_id: number;
  player1_score: number;
  player2_score: number;
  winner_id: number;
  tournament_id: number;
}

export const columnsMatches: ColumnDef<Match>[] = [
  {
    accessorKey: 'place',
    header: '',
  },
  {
    accessorKey: 'name',
    header: 'Игрок',
  },
];
