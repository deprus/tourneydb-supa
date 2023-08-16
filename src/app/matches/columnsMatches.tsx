'use client';

import { ColumnDef } from '@tanstack/react-table';

export interface Match {
  place: string;
  name: string;
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
