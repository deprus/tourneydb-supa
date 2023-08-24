import { Button } from '@/components/ui/button';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import UpdatePlayer from './UpdatePlayer';

export default function SheetUpdatePlayer({ data }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-8">
          Добавить игрока
        </Button>
      </DialogTrigger>
      <DialogContent>
        <UpdatePlayer data={data} />
      </DialogContent>
    </Dialog>
  );
}
