const KILOMETERS_PER_MILE = 1.60934;

export const formatDistanceKm = (distanceMiles: number): string =>
  `${(distanceMiles * KILOMETERS_PER_MILE).toFixed(1)} km`;
