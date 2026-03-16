'use client';

import dynamic from 'next/dynamic';
import PageWrapper from '../Layouts/Dashboard/PageWrapper';
import animationData from '../animations/404.json';

// Disable SSR for Lottie
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

function NotFound() {
  return (
    <PageWrapper>
      <div className="h-[80vh] flex justify-center items-center">
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ height: 400, width: 500 }}
        />
      </div>
    </PageWrapper>
  );
}

export default NotFound;
