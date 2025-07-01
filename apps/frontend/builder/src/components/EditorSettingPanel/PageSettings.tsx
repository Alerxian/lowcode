import { Skeleton } from '@lowcode/shadcn/components/ui/skeleton'

export function PageSettings() {
  return (
    <div>
      <div className="px-4 py-3 text-sm font-semibold">页面设置</div>
      <div className="flex flex-col space-y-3 px-4">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  )
}
