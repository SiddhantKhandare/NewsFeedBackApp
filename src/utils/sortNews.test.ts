const sortByScore = data => {
  return data.sort(
    (a, b) => b.score - a.score,
  );
};

test('sort by score descending', () => {
  const result = sortByScore([
    {score: 5},
    {score: 10},
    {score: 2},
  ]);

  expect(result[0].score).toBe(10);
});