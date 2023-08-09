import { Button } from '@/components/ui/button';

import AddTourneyButton from './AddTourneyButton';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Tournament {
  tournament: string;
  series: string;
  numPlayers: number;
  status: string;
  ended: string;
  champion: string;
  nickname: string;
  totalWins: number;
}

export default function SheetAddTourney() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-8">
          Добавить турнир
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddTourneyButton />
      </DialogContent>
    </Dialog>
  );
}
