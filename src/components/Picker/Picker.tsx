import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

interface ScrollPickerProps<T extends string | number> {
  values: T[];
  selectedValue?: T;
  onSelectedChange?: (selected: T) => void;
}

const Picker = <T extends string | number>({
  values,
  selectedValue,
  onSelectedChange,
}: ScrollPickerProps<T>) => {
  const SCROLL_DEBOUNCE_TIME = 100;
  const DEFAULT_ITEM_HEIGHT = 50;
  const SMALLER_ITEM_HEIGHT = 32;

  // const paddedValues: (string | number)[] = ['', '', ...values, '', ''];
  const paddedValues = useMemo(() => ['', '', ...values, '', ''], [values]);

  const [selected, setSelected] = useState(2);
  const ref = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isClickTriggered = useRef(false);

  const getDynamicHeight = (index: number) => {
    if (index >= selected - 1 && index <= selected + 1) return DEFAULT_ITEM_HEIGHT;
    return SMALLER_ITEM_HEIGHT;
  };

  const handleScroll = () => {
    if (isClickTriggered.current) return;

    if (ref.current) {
      clearTimeout(timerRef.current!);
      if (ref.current.scrollTop < DEFAULT_ITEM_HEIGHT) {
        ref.current.scrollTop = DEFAULT_ITEM_HEIGHT;
        return;
      }
      timerRef.current = setTimeout(() => {
        const paddedIdx =
          Math.floor((ref.current!.scrollTop - DEFAULT_ITEM_HEIGHT) / SMALLER_ITEM_HEIGHT) + 2;
        if (paddedIdx !== selected) {
          setSelected(paddedIdx);
          onSelectedChange?.(values[paddedIdx - 2]);

          const correctedScrollTop = SMALLER_ITEM_HEIGHT * (paddedIdx - 2) + DEFAULT_ITEM_HEIGHT;
          ref.current?.scrollTo({ top: correctedScrollTop, behavior: 'smooth' });
        }
      }, SCROLL_DEBOUNCE_TIME);
    }
  };

  const handleClick = useCallback(
    (index: number) => {
      if (paddedValues[index] !== '') {
        setSelected(index);
        const originalIdx = index - 2;
        const scrollTop = SMALLER_ITEM_HEIGHT * originalIdx + DEFAULT_ITEM_HEIGHT;
        ref.current?.scrollTo({ top: scrollTop, behavior: 'smooth' });
        onSelectedChange?.(values[originalIdx]);
      }
    },
    [paddedValues, setSelected, onSelectedChange, values],
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = DEFAULT_ITEM_HEIGHT;
    }
    if (selectedValue) {
      const index = paddedValues.indexOf(selectedValue);
      handleClick(index);
    } else {
      const index = selected - 2;
      onSelectedChange?.(values[index]);
    }
  }, []);

  return (
    <List ref={ref} onScroll={handleScroll}>
      <ListCenter />
      {paddedValues.map((item, index) => (
        <ListItem
          key={index}
          ref={(el: HTMLLIElement | null) => {
            itemRefs.current[index] = el;
          }}
          style={{ height: `${getDynamicHeight(index)}px` }}
          $isSelected={index === selected}
          $isNextItem={index === selected + 1 || index === selected - 1}
          onClick={() => handleClick(index)}
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default Picker;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 210px;
  overflow-y: scroll;
  position: relative;
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 및 Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const ListCenter = styled.div`
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[4]};
  top: 85px;
  height: 50px;
  position: sticky;
`;

const ListItem = styled.li<{ $isSelected: boolean; $isNextItem: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: ${({ $isSelected, $isNextItem }) => {
    if ($isSelected || $isNextItem) return `50px`;
    else return `32px`;
  }};
  ${({ $isSelected, $isNextItem, theme }) => {
    if ($isSelected) return theme.fonts.title.md;
    if ($isNextItem) return theme.fonts.text.xl;
    else return theme.fonts.text.md;
  }}
  ${({ $isSelected, theme }) => {
    const color = (() => {
      if ($isSelected) return 'black';
      else return theme.colors.gray[4];
    })();
    return `color: ${color};`;
  }}
`;
