export interface NewsItem {
  id: number;
  by: string;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export type RootStackParamList = {
  HomeScreen: undefined;
  Detail: {
    item: NewsItem;
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Bookmarks: undefined;
};