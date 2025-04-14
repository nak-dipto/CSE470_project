"use client";
import { Loader2, Verified } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useSession } from "next-auth/react";

const ProductReviews = ({ product, reviews }) => {
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const currentUser = session?.user;

  const handleReview = async () => {
    if (currentUser) {
      try {
        setLoading(true);

        const response = await fetch("/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product,
            userId: currentUser.name,
            comment,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);

        window.location.reload();
      }
    } else {
      alert("You need to sign in to review a product!");
    }
  };

  return (
    <section className="py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Reviews
          </h2>
        </div>

        <div className="space-y-4 mt-4 md:max-w-[60%]">
          <Textarea
            placeholder="Make a review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button disabled={loading} className="btn" onClick={handleReview}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
          </Button>
        </div>

        <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
          {reviews?.map((review) => {
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              month: "long", // Full month name
              day: "2-digit", // Two-digit day
              year: "numeric", // Full year
            }).format(new Date(review.createdAt));

            return (
              <div
                key={review._id}
                className="gap-3 p-4 pl-0 sm:flex sm:items-start"
              >
                <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {review.userId}
                    </p>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {formattedDate}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1">
                    <Verified className="h-5 w-5 text-blue-700 dark:text-blue-500" />

                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Verified purchase
                    </p>
                  </div>
                </div>

                <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {review.comment}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );s
};

export default ProductReviews;
