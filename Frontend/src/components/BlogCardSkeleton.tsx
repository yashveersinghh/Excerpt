import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const BlogCardSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#eaeaea" highlightColor="#f5f5f5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 mx-4 md:mx-60 border-b border-gray-200 mt-5">
        <div className="flex-1 flex flex-col gap-4 px-4 md:px-10 min-w-0">
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
        <div className="flex shrink-0 w-full h-48 md:w-36 md:h-24 lg:w-50 lg:h-40 px-4 md:px-0 md:mt-10 md:ml-4">
          <Skeleton width="100%" height="100%" className="rounded" />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default BlogCardSkeleton