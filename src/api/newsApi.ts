import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchTopStories = async () => {
  const idsRes = await axios.get(`${BASE_URL}/topstories.json`);

  const first20 = idsRes.data.slice(0, 20);

  const detailPromises = first20.map((id: number) =>
    axios.get(`${BASE_URL}/item/${id}.json`)
  );

  const details = await Promise.all(detailPromises);

  const stories = details
    .map(item => item.data)
    .filter(
      item =>
        item &&
        item.type === 'story' &&
        item.url
    );

  return stories;
};