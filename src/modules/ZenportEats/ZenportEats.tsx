import { Frame1, Frame2, Frame3 } from './components';
import { useZenportEats } from './hooks/useZenportEats';

import { LayoutStyle } from './styles';

interface Props {
  page: number;
  onNextClick: (num: number) => void;
}

const ZenportEats = ({ page, onNextClick }: Props) => {
  return (
    <LayoutStyle>
      {page === 1 && <Frame1 onNextPageUpdate={onNextClick} />}
      {page === 2 && <Frame2 onNextPageUpdate={onNextClick} />}
      {page === 3 && <Frame3 onNextPageUpdate={onNextClick} />}
    </LayoutStyle>
  );
};

export default ZenportEats;
