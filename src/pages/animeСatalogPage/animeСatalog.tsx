import {
  AnimeCatalogCards,
} from '../../components/appAnimeCatalog/animeCatalogCards/AnimeCatalogCards';
import {
  AnimeCatalogFilter,
} from '../../components/appAnimeCatalog/animeCatalogFilter/AnimeCatalogFilter';
import { useAppSelector } from '../../store/hooks';

export const AnimeСatalog = () => {
  const { bestSeasonOngoings: animes } = useAppSelector(
    (state) => state.BestSeasonOngoings,
  );

  return (
    <>
      <div className="catalog">
        <AnimeCatalogCards animes={animes} />
        <AnimeCatalogFilter />
      </div>
    </>
  );
};
