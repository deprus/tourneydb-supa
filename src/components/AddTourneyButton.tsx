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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import { useToast } from './ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { queryClient } from './Providers';

interface Tournament {
  tournament: string;
  series: string;
  numPlayers: number;
  status: string;
  ended: Date;
  champion: string;
  nickname: string;
  totalWins: number;
}

const FormSchema = z.object({
  series: z.string().min(1, 'Введите название серии'),
  tournament: z.string().min(1, 'Введите название турнира'),
  numPlayers: z.number().min(1, 'Введите количество участников'),
  status: z.string().min(1, 'Выберите статус турнира'),
  ended: z.date(),
  champion: z.string().min(1, 'Введите имя победителя'),
  nickname: z.string().min(1, 'Введите ник победителя'),
  totalWins: z
    .number()
    .min(1, 'Введите количество выигранных победителем турниров'),
});

export default function AddTourneyButton() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (values: Tournament): any => {
      const data = supabase.from('Tournaments').insert([
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
      console.log(data);
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Турнир добавлен',
        description: `${new Date().toLocaleString()}`,
      });
      queryClient.invalidateQueries({ queryKey: ['tournaments'] });
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
      series: '',
      tournament: '',
      numPlayers: 0,
      status: 'закончен',
      ended: new Date(),
      champion: '',
      nickname: '',
      totalWins: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    mutation.mutate(values);
  }

  const { data, isLoading: isGetting } = useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      let { data: Players, error } = await supabase.from('Players').select('*');
      console.log(Players);

      if (error) {
        console.error(error);
        throw new Error('Tournaments could not be loaded');
      }

      return Players;
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
            name="tournament"
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
            name="numPlayers"
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Статус</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="закончен">закончен</SelectItem>
                    <SelectItem value="объявлен">объявлен</SelectItem>
                    <SelectItem value="идет">идет</SelectItem>
                    <SelectItem value="регистрация">регистрация</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ended"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Финиш</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
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
            name="champion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Чемпион</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите чемпиона" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.map((player) => (
                      <SelectItem key={player.name} value={player.name}>
                        {player.name}
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
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ник на героях</FormLabel>
                <FormControl>
                  <Input placeholder="IvanIvanov" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalWins"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Счетчик</FormLabel>
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
