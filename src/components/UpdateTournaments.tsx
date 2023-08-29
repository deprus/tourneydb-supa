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
import { format } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import { useToast } from './ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { queryClient } from './Providers';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { Tournament } from '@/app/tournaments/columnsTournaments';

const FormSchema = z.object({
  name: z.string().min(1, 'Введите название турнира'),
  series: z.string().min(1, 'Введите название серии'),
  num_players: z.number().min(1, 'Введите количество участников'),
  end_date: z.date(),
  match_length: z.number().min(1, 'Введите длину матчей'),
});

export default function UpdateTournament({ data: tournamentsData }: any) {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (values: Tournament): any => {
      console.log(values);
      const data = supabase
        .from('tournament')
        .update({
          name: values.name,
          series: values.series,
          num_players: values.num_players,
          end_date: values.end_date,
          match_length: values.match_length,
        })
        .eq('id', tournamentsData.id)
        .select();
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Турнир изменен',
        description: `${new Date().toLocaleString()}`,
      });
      queryClient.invalidateQueries({ queryKey: ['tournament'] });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Не удалось изменить турнир.',
        action: (
          <ToastAction altText="Try again">Попробуйте еще раз</ToastAction>
        ),
      });
    },
  });

  console.log(tournamentsData);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: tournamentsData.name,
      series: tournamentsData.series,
      num_players: tournamentsData.num_players,
      end_date: new Date(tournamentsData.end_date),
      match_length: tournamentsData.match_length,
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
            name="series"
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
            name="name"
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
            name="num_players"
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
            name="end_date"
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
            name="match_length"
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
