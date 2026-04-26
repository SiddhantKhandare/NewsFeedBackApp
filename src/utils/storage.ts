import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARK_KEY =
  'BOOKMARKS_DATA';

export const saveBookmarks =
  async (
    data: any[],
  ): Promise<void> => {
    try {
      await AsyncStorage.setItem(
        BOOKMARK_KEY,
        JSON.stringify(
          data,
        ),
      );
    } catch (error) {}
  };

export const loadBookmarks =
  async (): Promise<
    any[]
  > => {
    try {
      const result =
        await AsyncStorage.getItem(
          BOOKMARK_KEY,
        );

      return result
        ? JSON.parse(
            result,
          )
        : [];
    } catch (error) {
      return [];
    }
  };

export const clearStorage =
  async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(
        BOOKMARK_KEY,
      );
    } catch (error) {}
  };