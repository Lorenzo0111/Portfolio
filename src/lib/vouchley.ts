export type VouchleyResponse = {
  error: string | null;
  user: {
    reviews: VouchleyReview[];
    average_rating: string;
  };
};

export type VouchleyReview = {
  id: string;
  description: string;
  pinned?: boolean;
  rating: number;
  message: string;
  time_sent: string;
  product: {
    description: string | null;
  } | null;
};

export class VouchleyError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export async function fetchReviews() {
  const apiKey = process.env.VOUCHLEY_API_KEY;
  if (!apiKey) throw new VouchleyError("VOUCHLEY_API_KEY is not set", 500);

  const response = await fetch(
    "https://vouchley.com/api/v1/user?id=a84c1044-0371-4999-92db-3770429dc6ea",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
    },
  );

  if (!response.ok)
    throw new VouchleyError(await response.text().catch(() => ""), 502);

  const data: VouchleyResponse = await response.json();
  if (data.error || !Array.isArray(data.user?.reviews))
    throw new VouchleyError(data.error ?? "Invalid response", 502);

  const pinned =
    process.env.VOUCHLEY_PINNED_REVIEWS?.split(",").map((id) => id.trim()) ??
    [];

  // Pinned reviews first, in the order they are listed in the env var
  const rank = (review: VouchleyReview) => {
    const i = pinned.indexOf(review.id);
    return i === -1 ? pinned.length : i;
  };

  return {
    ...data.user,
    reviews: data.user.reviews
      .map((review) => ({
        ...review,
        pinned: pinned.includes(review.id),
      }))
      .sort((a, b) => rank(a) - rank(b)),
  };
}
