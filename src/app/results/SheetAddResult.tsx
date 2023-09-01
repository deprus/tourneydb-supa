import { Button } from '@/components/ui/button';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AddResult from './AddResult';

export default function SheetAddResult() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-8">
          Добавить результат
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddResult />
      </DialogContent>
    </Dialog>
  );
}
