import React from 'react';

type ShowProps = {
  children: React.ReactNode;
};

type WhenProps = {
  isTrue: boolean;
  children: React.ReactNode;
};

type ElseProps = {
  children: React.ReactNode;
};

export const Show: React.FC<ShowProps> & {
  When: React.FC<WhenProps>;
  Else: React.FC<ElseProps>;
} = ({ children }) => {
  let when: React.ReactNode;
  let otherwise: React.ReactNode;

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) {
      otherwise = child;
    } else if (!when && child.props.isTrue) {
      when = child;
    }
  });

  return when ?? otherwise;
};

Show.When = ({ isTrue, children }) => (isTrue ? <>{children}</> : null);
Show.Else = ({ children }) => <>{children}</>;
