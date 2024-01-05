import {
  AnimeCatalogCards,
} from '../../components/appAnimeCatalog/animeCatalogCards/AnimeCatalogCards';
import {
  AnimeCatalogFilter,
} from '../../components/appAnimeCatalog/animeCatalogFilter/AnimeCatalogFilter';
import { useAppSelector } from '../../store/hooks';

export const AnimeСatalog = () => {
  const { animes } = useAppSelector((state) => state.anime);

  return (
    <>
      <div className="catalog">
        <AnimeCatalogCards animes={animes} />
        <AnimeCatalogFilter />
      </div>
    </>
  );
};
