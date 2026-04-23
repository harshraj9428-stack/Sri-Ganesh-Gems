import React from 'react';

export const AppSkeleton = () => (
  <div className="min-h-screen flex flex-col font-body texture-bg">
    {/* Navbar Skeleton */}
    <div className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center bg-transparent z-50">
      <div className="hidden md:flex space-x-8 w-1/3 justify-end items-center">
        <div className="w-20 h-4 skeleton-bg rounded-full relative"><div className="skeleton-shimmer"></div></div>
        <div className="w-24 h-4 skeleton-bg rounded-full relative"><div className="skeleton-shimmer"></div></div>
      </div>
      <div className="w-1/3 flex justify-center flex-col items-center">
         <div className="w-24 h-24 skeleton-bg rounded-full relative mb-3"><div className="skeleton-shimmer"></div></div>
         <div className="w-32 h-5 skeleton-bg rounded-full relative"><div className="skeleton-shimmer"></div></div>
      </div>
      <div className="hidden md:flex space-x-8 w-1/3 justify-start items-center">
         <div className="w-20 h-4 skeleton-bg rounded-full relative"><div className="skeleton-shimmer"></div></div>
         <div className="w-24 h-4 skeleton-bg rounded-full relative"><div className="skeleton-shimmer"></div></div>
      </div>
      {/* Mobile Menu Icon Skeleton */}
      <div className="md:hidden flex items-center w-1/3 justify-end">
        <div className="w-8 h-8 skeleton-bg rounded-full relative"><div className="skeleton-shimmer"></div></div>
      </div>
    </div>

    {/* Hero/Content Skeleton */}
    <div className="flex-grow flex flex-col items-center justify-center px-4 mt-[-10vh]">
       <div className="w-40 h-8 skeleton-bg rounded-full mb-8 relative"><div className="skeleton-shimmer"></div></div>
       <div className="w-[90%] md:w-[60%] h-20 md:h-32 skeleton-bg rounded-[2rem] mb-10 relative"><div className="skeleton-shimmer"></div></div>
       <div className="w-[70%] md:w-[40%] h-6 skeleton-bg rounded-full mb-4 relative"><div className="skeleton-shimmer"></div></div>
       <div className="w-[50%] md:w-[30%] h-6 skeleton-bg rounded-full mb-12 relative"><div className="skeleton-shimmer"></div></div>
       
       <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg justify-center">
          <div className="w-full sm:w-48 h-14 skeleton-bg rounded-full relative"><div className="skeleton-shimmer"></div></div>
          <div className="w-full sm:w-56 h-14 skeleton-bg rounded-full relative"><div className="skeleton-shimmer"></div></div>
       </div>
    </div>
  </div>
);
