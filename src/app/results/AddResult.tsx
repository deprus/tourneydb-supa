'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import { useToast } from '../../components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { queryClient } from '../../components/Providers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Result {
  result_player_id: string;
  result_tournament_id: string;
  result_place: number;
}

const FormSchema = z.object({
  result_player_id: z.string().min(1, 'Выберите игрока'),
  result_tournament_id: z.string().min(1, 'Выберите турнир'),
  result_place: z.number().min(1, 'Введите место'),
});

export default function AddResult() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (values: Result): any => {
      const data = supabase.from('result').insert([
        {
          result_player_id: +values.result_player_id,
          result_tournament_id: +values.result_tournament_id,
          result_place: values.result_place,
        },
      ]);
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Результат добавлен',
        description: `${new Date().toLocaleString()}`,
      });
      queryClient.invalidateQueries({ queryKey: ['result'] });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Не удалось добавить результат.',
        action: (
          <ToastAction altText="Try again">Попробуйте еще раз</ToastAction>
        ),
      });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      result_player_id: '0',
      result_tournament_id: '0',
      result_place: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    mutation.mutate(values);
  }

  const { data: playersData, isLoading: isGettingPlayers } = useQuery({
    queryKey: ['player'],
    queryFn: async () => {
      let { data, error } = await supabase.from('player').select('*');

      if (error) {
        console.error(error);
        throw new Error('Players could not be loaded');
      }

      return data;
    },
  });

  const { data: tournamentsData, isLoading: isGettingTournaments } = useQuery({
    queryKey: ['tournament'],
    queryFn: async () => {
      let { data, error } = await supabase.from('tournament').select('*');

      if (error) {
        console.error(error);
        throw new Error('Tournaments could not be loaded');
      }

      return data;
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3"
        >
          <FormField
            control={form.control}
            name="result_player_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Игрок</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {playersData?.map((player) => (
                      <SelectItem value={player.id} key={player.id}>
                        {player.player_nickname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="result_tournament_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Турнир</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tournamentsData?.map((tournament) => (
                      <SelectItem value={tournament.id} key={tournament.id}>
                        {tournament.tournament_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="result_place"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Место</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        isNaN(+e.target.value) ? '' : +e.target.value
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-2 w-40 mx-auto">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
