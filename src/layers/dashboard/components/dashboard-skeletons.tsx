export const DashboardStatsSkeleton = () => (
  <div className="animate-pulse  flex justify-center items-center relative">
    <div className="h-8 w-1/5 rounded-sm bg-gray-200  absolute top-1 right-1 "></div>
    <div className="size-24 rounded-full bg-gray-200  "></div>
  </div>
);
export const ListSkeleton = () => (
  <div className="animate-pulse space-y-2">
    <div className="flex p-2 gap-1 border rounded-md animate-pulse">
      <div className="size-6 rounded-full bg-gray-200   "></div>
      <div className="h-6 bg-gray-200  "></div>
      <div className="h-6 w-1/6 rounded-md bg-gray-200  "></div>
      <div className="h-6 flex-grow rounded-md bg-gray-200  "></div>
      <div className="size-6 rounded-full bg-gray-200   "></div>
    </div>
    <div className="flex p-2 gap-1 border rounded-md animate-pulse">
      <div className="size-6 rounded-full bg-gray-200   "></div>
      <div className="h-6 bg-gray-200  "></div>
      <div className="h-6 w-1/6 rounded-md bg-gray-200  "></div>
      <div className="h-6 flex-grow rounded-md bg-gray-200  "></div>
      <div className="size-6 rounded-full bg-gray-200   "></div>
    </div>
    <div className="flex p-2 gap-1 border rounded-md animate-pulse">
      <div className="size-6 rounded-full bg-gray-200   "></div>
      <div className="h-6 bg-gray-200  "></div>
      <div className="h-6 w-1/6 rounded-md bg-gray-200  "></div>
      <div className="h-6 flex-grow rounded-md bg-gray-200  "></div>
      <div className="size-6 rounded-full bg-gray-200   "></div>
    </div>
  </div>
);
