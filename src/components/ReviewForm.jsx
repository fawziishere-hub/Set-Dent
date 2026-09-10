import { FiStar } from "react-icons/fi";

// eslint-disable-next-line react/prop-types
const ReviewForm = ({
  handleSubmit,
  rating,
  setRating,
  reviewText,
  setReviewText,
  editingReview,
  isLoading,
}) => {
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-bold text-primary-900 dark:text-white">
        {editingReview ? "Edit your review" : "Add your review"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                size={24}
                className={`cursor-pointer transition-colors ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-300"
                }`}
                aria-label={`Rate ${star} star`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here (optional)"
          className="w-full rounded-md border border-gray-300 p-3 transition-colors focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          rows="4"
        ></textarea>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading
            ? "Sending..."
            : editingReview
            ? "Update Review"
            : "Send Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
