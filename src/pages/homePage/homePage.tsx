// import {
//   BestLastestList,
// } from '../../components/appHomePage/BestLastestList/BestLastestList';

import {
  LastUpdatedCards,
} from '../../components/appHomePage/LastUpdated/LastUpdatedCards';
import { useAppSelector } from '../../store/hooks';

export const HomePage = () => {
  const { animes } = useAppSelector((state) => state.anime);

  return (
    <>
      <LastUpdatedCards animes={animes} />

      {/* <BestLastestList /> */}
    </>
  );
};
