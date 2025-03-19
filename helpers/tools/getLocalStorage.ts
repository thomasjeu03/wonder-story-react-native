import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieves the value of an AsyncStorage item and applies a filter if given.
 * If the item does not exist, `optionalWhenUndefined` will be used as the default value.
 *
 * @param item - The key of the AsyncStorage item to retrieve.
 * @param filter - A function to filter the retrieved value (only applied if it's an array).
 * @param optionalWhenUndefined - The value to use if the item does not exist.
 * @returns The retrieved and possibly filtered value, or `undefined` if an error occurs.
 */
const getLocalStorage = async <T>(
    item: string,
    filter?: (value: T) => boolean,
    optionalWhenUndefined?: string
): Promise<T | undefined> => {
  try {
    const dataToParse = (await AsyncStorage.getItem(item)) ?? optionalWhenUndefined;

    let element: T;
    try {
      element = JSON.parse(dataToParse as string);
    } catch (jsonError) {
      element = dataToParse as T;
    }

    if (filter && Array.isArray(element)) {
      return element.filter(filter) as T;
    }

    return element;
  } catch (e) {
    console.warn(`Error while parsing AsyncStorage item with key ${item}:`, e);
    return undefined;
  }
};

export default getLocalStorage;