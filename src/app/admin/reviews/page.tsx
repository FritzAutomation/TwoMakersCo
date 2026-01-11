import Link from "next/link";
import { isAdmin } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import { getAllReviews } from "@/lib/supabase/reviews";
import ReviewActions from "./ReviewActions";

export default async function AdminReviewsPage() {
  const adminAccess = await isAdmin();
  if (!adminAccess) {
    redirect("/login?error=unauthorized");
  }

  const reviews = await getAllReviews();
  const pendingCount = reviews.filter((r) => !r.is_approved).length;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-27 font-bold text-brown">Reviews</h1>
          {pendingCount > 0 && (
            <p className="text-16 text-brown/70 mt-1">
              {pendingCount} pending approval
            </p>
          )}
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-16 text-gray-600">No reviews yet</p>
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white rounded-lg shadow-sm p-4 ${
                  !review.is_approved ? "border-l-4 border-yellow-500" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={star <= review.rating ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      {!review.is_approved && (
                        <span className="text-12 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="text-16 font-medium text-brown">
                      {review.title || "No title"}
                    </p>
                  </div>
                </div>

                <p className="text-14 text-brown/70 mb-2 line-clamp-2">
                  {review.content || "No content"}
                </p>

                <div className="flex items-center gap-2 text-14 text-gray-500 mb-3">
                  <span>{review.author_name}</span>
                  <span>•</span>
                  <Link
                    href={`/shop/${review.products?.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {review.products?.name}
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-14 text-gray-500">
                    {formatDate(review.created_at)}
                  </span>
                  <ReviewActions
                    reviewId={review.id}
                    isApproved={review.is_approved}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                    Review
                  </th>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                    Product
                  </th>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                    Author
                  </th>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-14 font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="text-right px-6 py-3 text-14 font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reviews.map((review) => (
                  <tr
                    key={review.id}
                    className={`hover:bg-gray-50 ${
                      !review.is_approved ? "bg-yellow-50/50" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={star <= review.rating ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-16 font-medium text-brown">
                        {review.title || "No title"}
                      </p>
                      <p className="text-14 text-brown/60 line-clamp-1">
                        {review.content || "No content"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/shop/${review.products?.slug}`}
                        className="text-16 text-blue-600 hover:underline"
                      >
                        {review.products?.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-16 text-brown">{review.author_name}</p>
                      <p className="text-14 text-gray-500">{review.author_email}</p>
                    </td>
                    <td className="px-6 py-4">
                      {review.is_approved ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-12 font-medium bg-green-100 text-green-800">
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-12 font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                      {review.is_verified_purchase && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-12 font-medium bg-blue-100 text-blue-800">
                          Verified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-14 text-gray-600">
                      {formatDate(review.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ReviewActions
                        reviewId={review.id}
                        isApproved={review.is_approved}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
