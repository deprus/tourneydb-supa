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
import { useToast } from '../../components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { queryClient } from '../../components/Providers';
import { Player } from '@/app/players/columnsPlayer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../../components/ui/calendar';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
  player_name: z.string().min(1, 'Введите имя'),
  player_surname: z.string().min(1, 'Введите фамилию'),
  player_middle_name: z.string(),
  player_nickname: z.string().min(1, 'Введите ник'),
  player_image: z.string(),
  player_gender: z.string(),
  player_title: z.string(),
  player_residence: z.string(),
  player_title_date: z.date(),
  player_join_date: z.date(),
  player_district: z.string(),
  player_mobile_number: z.string(),
  player_mail: z.string(),
  player_socials: z.string(),
});

export default function AddPlayer() {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (values: Player): any => {
      const data = supabase.from('player').insert([
        {
          player_name: values.player_name,
          player_surname: values.player_surname,
          player_middle_name: values.player_middle_name,
          player_nickname: values.player_nickname,
          player_image: values.player_image,
          player_gender: values.player_gender,
          player_title: values.player_title,
          player_residence: values.player_residence,
          player_title_date: values.player_title_date,
          player_join_date: values.player_join_date,
          player_district: values.player_district,
          player_mobile_number: values.player_mobile_number,
          player_mail: values.player_mail,
          player_socials: values.player_socials,
        },
      ]);
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Игрок добавлен',
        description: `${new Date().toLocaleString()}`,
      });
      queryClient.invalidateQueries({ queryKey: ['player'] });
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
      player_name: '',
      player_surname: '',
      player_middle_name: '',
      player_nickname: '',
      player_image: '',
      player_gender: '',
      player_title: '',
      player_residence: '',
      player_title_date: new Date(),
      player_join_date: new Date(),
      player_district: '',
      player_mobile_number: '',
      player_mail: '',
      player_socials: '',
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    mutation.mutate(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
          <FormField
            control={form.control}
            name="player_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="player_surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="player_middle_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отчество</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="player_nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ник</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="player_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фото</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="player_gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пол</FormLabel>
                <Select onValueChange={field.onChange} defaultValue="">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="М">Мужской</SelectItem>
                    <SelectItem value="Ж">Женский</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="player_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Звание</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="player_residence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Место жительства</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="player_join_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Вошел в клуб</FormLabel>
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
                          <span>Выберите дату входа в клуб</span>
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
            name="player_title_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Присвоено звание</FormLabel>
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
                          <span>Выберите дату присвоения звания</span>
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
            name="player_district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Округ</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="player_mobile_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Номер телефона</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="player_mail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="player_socials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Соц сети</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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
