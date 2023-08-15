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
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import { useToast } from './ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { queryClient } from './Providers';
import { Player } from '@/app/players/columnsPlayers';

const FormSchema = z.object({
  name: z.string().min(1, 'Введите имя, фамилию'),
  nickname: z.string().min(1, 'Введите ник'),
  image: z.string().min(1, 'Введите ссылку на фото'),
  rating: z.number(),
  tourneys: z.number(),
  gold: z.number(),
  silver: z.number(),
  bronze: z.number(),
  matches: z.number(),
  wins: z.number(),
  winsPerc: z.number(),
});

export default function AddPlayerButton() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (values: Player): any => {
      const data = supabase.from('Players').insert([
        {
          name: values.name,
          nickname: values.nickname,
          rating: values.rating,
          image: values.image,
          tourneys: values.tourneys,
          gold: values.gold,
          silver: values.silver,
          bronze: values.bronze,
          matches: values.matches,
          wins: values.wins,
          winsPerc: values.winsPerc,
        },
      ]);
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Игрок добавлен',
        description: `${new Date().toLocaleString()}`,
      });
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Не удалось добавить игрока.',
        action: (
          <ToastAction altText="Try again">Попробуйте еще раз</ToastAction>
        ),
      });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      nickname: '',
      rating: 1500,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/e/e4/Elliot_Grieveson.png',
      tourneys: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
      matches: 0,
      wins: 0,
      winsPerc: 0,
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
          className="grid grid-cols-5 gap-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Иван Иванов" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ник</FormLabel>
                <FormControl>
                  <Input placeholder="JohnDoeNickname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фото</FormLabel>
                <FormControl>
                  <Input placeholder="https://playerphoto.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-5 w-40 mx-auto">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
