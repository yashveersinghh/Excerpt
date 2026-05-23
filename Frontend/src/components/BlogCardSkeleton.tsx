import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const BlogCardSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#eaeaea" highlightColor="#f5f5f5">
      <div className="mx-4 md:mx-60 mt-5 mb-5">
        <div className="flex flex-col gap-5 rounded-3xl border border-transparent bg-white/70 px-4 py-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:flex-row md:items-center md:justify-between md:px-2 md:py-5">
          <div className="flex-1 flex flex-col gap-4 md:px-8 min-w-0">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Skeleton circle width={36} height={36} />
                <Skeleton width={100} height={12} />
              </div>
              <div><Skeleton width={60} height={12} /></div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="font-bold text-lg md:text-2xl"><Skeleton width="60%" height={24} /></div>
              <div className="font-light text-gray-700 text-sm md:text-base">
                <Skeleton count={2} />
              </div>
              <div className="text-sm text-neutral-500"><Skeleton width={80} height={12} /></div>
            </div>
          </div>
          <div className="block w-full md:hidden">
            <div className="overflow-hidden rounded-2xl">
              <Skeleton width="100%" height={180} />
            </div>
          </div>
          <div className="hidden shrink-0 w-full md:block md:w-48 lg:w-56">
            <Skeleton
              width="100%"
              height={192}
              className="rounded-2xl md:h-36 lg:h-44"
            />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default BlogCardSkeleton