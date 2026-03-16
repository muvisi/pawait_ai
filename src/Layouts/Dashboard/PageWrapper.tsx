import { FC, ReactNode } from 'react';

interface props {
  title?: string;
  children: ReactNode;
}

const PageWrapper: FC<props> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-[#1F2937] py-4 md:py-6 px-4 md:px-10 rounded-md relative ">
      <div className=" h-full">
        <h1 className="mb-4 text-xl font-semibold text-primary dark:text-white ">
          {title}
        </h1>

        {children}

        <div className="h-[100px]"></div>
      </div>
    </div>
  );
};

export default PageWrapper;
