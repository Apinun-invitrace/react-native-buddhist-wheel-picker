/**
 * Buddhist Era (B.E.) conversion utilities
 * B.E. = A.D. + 543
 */

/**
 * Convert A.D. year to Buddhist Era year
 * @param adYear - Gregorian calendar year (A.D.)
 * @returns Buddhist Era year (B.E.)
 */
export const toBuddhistYear = (adYear: number): number => {
  return adYear + 543;
};

/**
 * Convert Buddhist Era year to A.D. year
 * @param beYear - Buddhist Era year (B.E.)
 * @returns Gregorian calendar year (A.D.)
 */
export const fromBuddhistYear = (beYear: number): number => {
  return beYear - 543;
};
