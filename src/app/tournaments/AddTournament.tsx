'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Input } from '@/components/ui/input';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import { useToast } from '../../components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { queryClient } from '../../components/Providers';

interface Tournament {
  tournament_name: string;
  tournament_series: string;
  tournament_num_players: number;
  tournament_end_date: Date;
  tournament_match_length: number;
}

const FormSchema = z.object({
  tournament_name: z.string().min(1, 'Введите название турнира'),
  tournament_series: z.string().min(1, 'Введите название серии'),
  tournament_num_players: z.number().min(1, 'Введите количество участников'),
  tournament_end_date: z.date(),
  tournament_match_length: z.number().min(1, 'Введите длину матчей'),
});

export default function AddTourneyButton() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (values: Tournament): any => {
      const data = supabase.from('tournament').insert([
        {
          tournament_name: values.tournament_name,
          tournament_series: values.tournament_series,
          tournament_num_players: values.tournament_num_players,
          tournament_end_date: values.tournament_end_date,
          tournament_match_length: values.tournament_match_length,
        },
      ]);
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Турнир добавлен',
        description: `${new Date().toLocaleString()}`,
      });
      queryClient.invalidateQueries({ queryKey: ['tournament'] });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Не удалось добавить турнир.',
        action: (
          <ToastAction altText="Try again">Попробуйте еще раз</ToastAction>
        ),
      });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tournament_name: '',
      tournament_series: '',
      tournament_num_players: 0,
      tournament_end_date: new Date(),
      tournament_match_length: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    mutation.mutate(values);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-3"
        >
          <FormField
            control={form.control}
            name="tournament_series"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Серия</FormLabel>
                <FormControl>
                  <Input placeholder="Герои" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tournament_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Турнир</FormLabel>
                <FormControl>
                  <Input placeholder="Январь" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tournament_num_players"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Участников</FormLabel>
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
          <FormField
            control={form.control}
            name="tournament_end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Финиш</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Выберите дату</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tournament_match_length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Длина матчей</FormLabel>
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
