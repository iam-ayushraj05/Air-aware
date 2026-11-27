export function computeImpactEquivalencies(emissionsSavedKg: number) {
  const treeDays = (emissionsSavedKg * 1.5).toFixed(1);
  const urbanKmWalked = (emissionsSavedKg * 5.2).toFixed(0);

  return {
    treeDays,
    urbanKmWalked,
  };
}
