import {
  BestSeasonOngoings,
} from '../../components/appHomePage/BestSeasonOngoings/BestSeasonOngoings';
import {
  LastUpdated,
} from '../../components/appHomePage/LastUpdated/LastUpdated';
import { useAppSelector } from '../../store/hooks';

export const HomePage = () => {
  const { animes } = useAppSelector((state) => state.anime);

  return (
    <div className="home">
      <LastUpdated animes={animes} />

      <BestSeasonOngoings animes={animes} />
    </div>
  );
};
