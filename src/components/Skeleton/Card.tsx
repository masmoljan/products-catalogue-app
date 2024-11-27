import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  skeletonAmout: number
}
 
export function SkeletonCard({
  skeletonAmout
} : SkeletonCardProps ) {
  return (
    <>
      {[...Array(skeletonAmout)].map((_, i) => (
        <Skeleton key={i} className="h-[410px] w-[350px]" />
      )
      )}
    </>
  );
}