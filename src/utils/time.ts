export const getRelativeTime = (
  unixTime: number,
): string => {
  const now =
    Math.floor(
      Date.now() / 1000,
    );

  const diff =
    now - unixTime;

  if (diff < 60) {
    return `${diff}s ago`;
  }

  if (diff < 3600) {
    const mins =
      Math.floor(
        diff / 60,
      );

    return `${mins}m ago`;
  }

  if (diff < 86400) {
    const hrs =
      Math.floor(
        diff / 3600,
      );

    return `${hrs}h ago`;
  }

  const days =
    Math.floor(
      diff / 86400,
    );

  return `${days}d ago`;
};