import { Button } from '@/components/ui/button';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AddPlayer from './AddPlayer';

export default function SheetUpdatePlayer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-8">
          Добавить игрока
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddPlayer />
      </DialogContent>
    </Dialog>
  );
}
