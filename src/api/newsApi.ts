import axios from 'axios';

const BASE_URL =
  'https://hacker-news.firebaseio.com/v0';

export interface NewsItem {
  id: number;
  by: string;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export const fetchTopStories =
  async (): Promise<
    NewsItem[]
  > => {
    try {
      const idsResponse =
        await axios.get(
          `${BASE_URL}/topstories.json`,
        );

      const ids =
        idsResponse.data
          .slice(0, 20);

      const requests =
        ids.map(
          (id: number) =>
            axios.get(
              `${BASE_URL}/item/${id}.json`,
            ),
        );

      const responses =
        await Promise.all(
          requests,
        );

      const stories =
        responses
          .map(
            res =>
              res.data,
          )
          .filter(
            item =>
              item &&
              item.type ===
                'story' &&
              item.url,
          );

      return stories;
    } catch (error) {
      throw error;
    }
  };