'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export default function Page({ params }: { params: { slug: string } }) {
  const { data, isLoading: isGetting } = useQuery({
    queryKey: ['player'],
    queryFn: async () => {
      let { data: player, error } = await supabase
        .from('player')
        .select()
        .eq('nickname', `${params.slug}`);

      if (error) {
        console.error(error);
        throw new Error('Players could not be loaded');
      }
      return player;
    },
  });

  const dataArray = data || [];

  if (isGetting) {
    return (
      <div className="flex items-center justify-center mt-60">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="bg-gray-900 ">
        <div className="flex flex-col w-9/12 border-x border-gray-600 mx-auto">
          <div className="flex gap-5 p-4 md:text-2xl">
            <div className="text-center text-white mx-auto">
              {`${dataArray[0].title} ${dataArray[0].surname} ${dataArray[0].name}`}
            </div>
            <div className="text-center mx-auto text-white">
              Рейтинг: {`${dataArray[0].rating || 1500}`}
            </div>
          </div>
          <div className="flex pb-8">
            <Image
              alt="hi"
              src={`${
                dataArray[0].image ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvps95102GIXonulPifyuyXmnfVVG8pgvXyrXW6FAaiQ&s'
              }`}
              width={300}
              height={300}
              className="object-cover mx-auto md:h-96 md:rounded-l-xl md:rounded-r-none rounded-xl"
            />
            <div className="text-white mx-auto flex flex-col justify-center items-start md:text-2xl">
              <div>Турниров: 0</div>
              <div>Золото: 0</div>
              <div>Серебро: 0</div>
              <div>Бронза: 0</div>
              <div>% успехов: 0</div>
              <div>Соперников: 0</div>
              <div>Матчей: 0</div>
              <div>% побед: 0</div>
            </div>
          </div>
          <table className="text-white mx-auto border-t border-gray-600 w-full">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Турнир</th>
                <th>Место</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
              </tr>
              <tr>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
              </tr>
              <tr>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
              </tr>
              <tr>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
              </tr>
              <tr>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
              </tr>
              <tr>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
              </tr>
              <tr>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
              </tr>
              <tr>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
              </tr>
              <tr>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
              </tr>
              <tr>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
              </tr>
              <tr>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
}
