import React, { FC, ReactNode, CSSProperties, ComponentType } from 'react';

type TStyles = string | string[] | CSSProperties | CSSProperties[];

interface IStyled {
  styles: TStyles;
  children: ReactNode | ReactNode[];
}

const cssPropertiesToString = (styles: CSSProperties): string => {
  return Object.entries(styles).reduce((styleString, [propName, propValue]) => {
    const kebabPropName = propName.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
    return `${styleString}${kebabPropName}:${propValue};`;
  }, '');
};

const Styled: FC<IStyled> = ({ styles, children }): JSX.Element => {
  let stylesString = '';

  if (typeof styles === 'string' || Array.isArray(styles)) {
    stylesString = Array.isArray(styles) ? styles.join(' ') : styles;
  } else if (styles instanceof Object) {
    stylesString = Array.isArray(styles)
      ? styles.map(cssPropertiesToString).join(' ')
      : cssPropertiesToString(styles);
  }

  return (
    <div>
      <style>{stylesString}</style>
      {children}
    </div>
  );
};

const withStyles = (styles: TStyles) => <P extends {}>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => (
    <Styled styles={styles}>
      <WrappedComponent {...props} />
    </Styled>
  );
};

export { withStyles, Styled };
