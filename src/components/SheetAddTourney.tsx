import { Button } from '@/components/ui/button';

import AddTourneyButton from './AddTourneyButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface Tournament {
  tournament: string;
  series: string;
  numPlayers: number;
  status: string;
  ended: string;
  champion: string;
  nickname: string;
  totalWins: number;
}

const addRow = async (values: Tournament) => {
  return await supabase.from('Tournaments').insert([
    {
      tournament: values.tournament,
      series: values.series,
      numPlayers: values.numPlayers,
      status: values.status,
      ended: values.ended,
      champion: values.champion,
      nickname: values.nickname,
      totalWins: values.totalWins,
    },
  ]);
};

export default function SheetAddTourney() {
  // const queryClient = useQueryClient();
  // const { toast } = useToast();
  // const mutation = useMutation({
  //   mutationFn: (values: Tournament) => {
  //     return supabase.from('Tournaments').insert([
  //       {
  //         tournament: values.tournament,
  //         series: values.series,
  //         numPlayers: values.numPlayers,
  //         status: values.status,
  //         ended: values.ended,
  //         champion: values.champion,
  //         nickname: values.nickname,
  //         totalWins: values.totalWins,
  //       },
  //     ]);
  //   },
  //   onSuccess: () => {
  //     toast({
  //       title: 'Турнир добавлен',
  //       description: `${new Date().toLocaleString()}`,
  //     });
  //     queryClient.invalidateQueries({ queryKey: ['tournaments'] });
  //   },
  //   onError: () => {
  //     toast({
  //       variant: 'destructive',
  //       title: 'Не удалось добавить турнир.',
  //       action: (
  //         <ToastAction altText="Try again">Попробуйте еще раз</ToastAction>
  //       ),
  //     });
  //   },
  // });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-8">
          Добавить турнир
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddTourneyButton />
      </DialogContent>
    </Dialog>
  );
}
