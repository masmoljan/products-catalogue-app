import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProductReviewCardProps {
  comment: string,
  rating: number,
  reviewerName: string
}

export default function ProductReviewCard({
  comment,
  rating,
  reviewerName
} : ProductReviewCardProps) {
  return (
    <Card className="max-w-screen-sm min-h-full">
      <CardHeader className="min-h-full pb-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="min-h-full pt-0 pb-2">
        <i className="text-sm text-gray-600">
          {comment}
        </i>
      </CardContent>
      <CardFooter>
        <p className="text-sm font-medium">{reviewerName}</p>
      </CardFooter>
    </Card>
  );
}

