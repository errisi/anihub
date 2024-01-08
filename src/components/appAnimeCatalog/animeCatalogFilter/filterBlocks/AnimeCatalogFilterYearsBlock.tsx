import { FC } from 'react';
import {
  Slider,
} from '@mui/material';

type Props = {
  selectedYears: number[];
  setSelectedYears: React.Dispatch<React.SetStateAction<number[]>>;
};

export const AnimeCatalogFilterYearsBlock: FC<Props> = ({
  selectedYears,
  setSelectedYears,
}) => {
  const handleYearsSelect = (_: Event, newValue: number | number[]) => {
    setSelectedYears(newValue as number[]);
  };

  const minmaxvalue = [1959, 2024];

  const marks = [
    {
      value: minmaxvalue[0],
      label: `${minmaxvalue[0]}`,
    },
    {
      value: Math.round(
        Math.round(
          ((minmaxvalue[0] + minmaxvalue[1]) / 2) + minmaxvalue[0],
        ) / 2,
      ),
      label: `${Math.round(
        Math.round(
          ((minmaxvalue[0] + minmaxvalue[1]) / 2) + minmaxvalue[0],
        ) / 2,
      )}`,
    },
    {
      value: Math.round((minmaxvalue[0] + minmaxvalue[1]) / 2),
      label: `${Math.round((minmaxvalue[0] + minmaxvalue[1]) / 2)}`,
    },
    {
      value: Math.round(
        Math.round(
          ((minmaxvalue[0] + minmaxvalue[1]) / 2) + minmaxvalue[1],
        ) / 2,
      ),
      label: `${Math.round(
        Math.round(
          ((minmaxvalue[0] + minmaxvalue[1]) / 2) + minmaxvalue[1],
        ) / 2,
      )}`,
    },
    {
      value: minmaxvalue[1],
      label: `${minmaxvalue[1]}`,
    },
  ];

  return (
    <>
      <div className="catalog__filter__block">
        <p
          className="catalog__filter__block__title"
        >
          Год Выхода
        </p>

        <div className="catalog__filter__block-years">
          <Slider
            getAriaLabel={() => 'Temperature range'}
            min={1959}
            max={2024}
            marks={marks}
            value={selectedYears}
            onChange={handleYearsSelect}
            valueLabelDisplay="auto"
            sx={{ width: 280 }}
          />
        </div>
      </div>
    </>
  );
};
