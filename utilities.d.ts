type PropsOf<T extends React.FC<any> | React.ComponentClass<any>> = T extends
  | React.FC<infer P>
  | React.ComponentClass<infer P>
  ? P
  : never;
