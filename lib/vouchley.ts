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
