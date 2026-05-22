const BlogSkeleton = () => {
	return (
		<div className="bg-neutral-50 w-full flex items-start justify-center md:py-6 px-4 animate-pulse">
			<div className="w-full max-w-3xl bg-neutral-50 rounded-2xl p-6 md:p-8">
				<div className="h-6 w-24 rounded bg-gray-200" />
				<div className="mt-4 h-72 w-full rounded-2xl bg-gray-200" />
				<div className="mt-6 space-y-4">
					<div className="h-10 w-3/4 rounded bg-gray-200" />
					<div className="flex items-center gap-4">
						<div className="h-5 w-28 rounded bg-gray-200" />
						<div className="h-5 w-24 rounded bg-gray-200" />
					</div>
					<div className="h-5 w-full rounded bg-gray-200" />
				</div>
				<div className="mt-6 space-y-3">
					<div className="h-4 w-full rounded bg-gray-200" />
					<div className="h-4 w-full rounded bg-gray-200" />
					<div className="h-4 w-5/6 rounded bg-gray-200" />
				</div>
			</div>
		</div>
	)
}

export default BlogSkeleton
