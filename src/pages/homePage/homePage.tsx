import style from './homePage.module.scss';
import { NewReleased } from '../../components/Home/NewReleased/NewReleased';
import { BestSeasonOngoings }
  from '../../components/Home/BestSeasonOngoings/BestSeasonOngoings';
import { ReleaseCalendar }
  from '../../components/Home/ReleaseCalendar/ReleaseCalendar';
import { Promo } from '../../components/Home/Promo/Promo';
import { Welcome } from '../../components/Home/Welcome/Welcome';

export const HomePage = () => (
  <div className={style.home}>
    <Welcome />

    <BestSeasonOngoings />

    <ReleaseCalendar />

    <NewReleased />

    <Promo />
  </div>
);
