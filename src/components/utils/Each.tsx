import { Children, ReactNode } from 'react';

type EachProps<T> = {
  render: (item: T, index: number) => ReactNode;
  of: T[];
  renderEmpty?: ReactNode | null;
};

export const Each = <T,>({ render, of, renderEmpty }: EachProps<T>) => {
  if (of.length === 0 && (renderEmpty || renderEmpty != null))
    return renderEmpty;

  return Children.toArray(of.map((item, index) => render(item, index)));
};
