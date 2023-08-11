import { Button } from '@/components/ui/button';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AddPlayerButton from './AddPlayerButton';

export default function SheetAddPlayer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-8">
          Добавить игрока
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddPlayerButton />
      </DialogContent>
    </Dialog>
  );
}
