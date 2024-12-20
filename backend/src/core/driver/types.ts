export type DriverOption = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
};

export type DriverSummary = {
  id: number;
  name: string;
};
