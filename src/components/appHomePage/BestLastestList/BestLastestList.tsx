import { FC } from 'react';
import { Grid } from '@mui/material';

const tileData = [
  {
    img: 'images/image1.jpg',
    title: 'title',
  },
  {
    img: 'images/image2.jpg',
    title: 'title',
  },
  {
    img: 'images/image3.jpg',
    title: 'title',
  },
];

export const BestLastestList: FC = () => (
  <div className="best-lastest">
    <Grid className="best-lastest__list">
      {tileData.map((tile) => (
        <div key={tile.img}>
          <img src={tile.img} alt={tile.title} />
          <p>{tile.title}</p>
        </div>
      ))}
    </Grid>
  </div>
);
