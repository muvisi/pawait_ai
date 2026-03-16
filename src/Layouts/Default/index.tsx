import { FC, ReactNode } from 'react';

interface layoutProps {
  children: ReactNode;
}

const DefaultLayout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="">
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;
