// import {
//   BestLastestList,
// } from '../../components/appHomePage/BestLastestList/BestLastestList';

import { useAppSelector } from '../../store/hooks';

export const HomePage = () => {
  const { animes } = useAppSelector((state) => state.anime);

  return (
    <>
      <h1>Home Page</h1>

      {animes.map((anime) => (
        <p>{anime.title}</p>
      ))}

      {/* <BestLastestList /> */}
    </>
  );
};
