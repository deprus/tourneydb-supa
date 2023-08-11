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
  place: z.string().min(1, 'Введите место'),
  name: z.string().min(1, 'Введите имя, фамилию'),
  nickname: z.string().min(1, 'Введите ник'),
  rating: z.number().min(1, 'Введите рейтинг'),
  image: z.string().min(1, 'Введите ссылку на фото'),
  tourneys: z.number().min(1, 'Введите количество турниров'),
  gold: z.number().min(1, 'Введите количество золотых медалей'),
  silver: z.number().min(1, 'Введите количество серебряных медалей'),
  bronze: z.number().min(1, 'Введите количество бронзовых медалей'),
  matches: z.number().min(1, 'Введите количество матчей'),
  wins: z.number().min(1, 'Введите количество побед'),
  winsPerc: z.number().min(1, 'Введите процент побед'),
  lastT: z.string().min(1, 'Введите последний турнир'),
});

export default function AddPlayerButton() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (values: Player): any => {
      const data = supabase.from('Players').insert([
        {
          place: values.place,
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
          lastT: values.lastT,
        },
      ]);
      console.log(data);
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
      place: '',
      name: '',
      nickname: '',
      rating: 0,
      image: '',
      tourneys: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
      matches: 0,
      wins: 0,
      winsPerc: 0,
      lastT: '',
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
            name="place"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Место</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
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
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Рейтинг</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1600"
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
          <FormField
            control={form.control}
            name="tourneys"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Турниров</FormLabel>
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
            name="gold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Золото</FormLabel>
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
            name="silver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Серебро</FormLabel>
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
            name="silver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Серебро</FormLabel>
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
            name="bronze"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Бронза</FormLabel>
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
            name="tourneys"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Турниров</FormLabel>
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
            name="matches"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Матчей</FormLabel>
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
            name="wins"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Побед</FormLabel>
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
            name="winsPerc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Процент побед</FormLabel>
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
            name="lastT"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Последний турнир</FormLabel>
                <FormControl>
                  <Input placeholder="Случайный турнир" {...field} />
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
