import React, {memo, useMemo} from 'react';
import Picker, {type PickerProps} from '@implementation/base';
import {useDateContext} from './DatePickerValueProvider';
import {useOverlayItemStyle} from './useOverlayItemStyle';
import {useDatePickerLocale} from './DatePickerLocaleProvider';
import {withCommonProps} from './DatePickerCommonPropsProvider';
import {withPickerControl} from '@implementation/picker-control';
import {toBuddhistYear} from './buddhistEra';

const HocPicker = withCommonProps(withPickerControl(Picker));

export type DatePickerYearProps = Omit<
  PickerProps<{value: number; label?: string}>,
  'value' | 'data'
>;

const DatePickerYear = ({
  width = 100,
  overlayItemStyle: overlayItemStyleProp,
  ...restProps
}: DatePickerYearProps) => {
  const localeData = useDatePickerLocale();
  const dateContext = useDateContext();
  const value = dateContext.value;
  const useBuddhistEra = dateContext.useBuddhistEra;
  const data = useMemo(() => {
    const startYear = dateContext.min.getFullYear();
    const endYear = dateContext.max.getFullYear();

    return Array.from({length: endYear - startYear + 1}, (_, index) => {
      const adYear = startYear + index;

      if (useBuddhistEra) {
        const beYear = toBuddhistYear(adYear);
        return {
          value: adYear,
          label: beYear.toString(),
        };
      }

      return {
        value: adYear,
      };
    });
  }, [dateContext.max, dateContext.min, useBuddhistEra]);

  const overlayItemStyle = useOverlayItemStyle({
    curUnit: 'year',
    unitPositions: localeData.sortedDateUnitTypes,
    propStyle: overlayItemStyleProp,
  });

  return (
    <HocPicker
      width={width}
      overlayItemStyle={overlayItemStyle}
      {...restProps}
      pickerName={'year'}
      control={dateContext.pickerControl}
      value={value.year}
      data={data}
    />
  );
};

export default memo(DatePickerYear);
