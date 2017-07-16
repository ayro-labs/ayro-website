export class StorageUtil {

  public static set(key: string, value: string) {
    try {
      if (localStorage) {
        localStorage.setItem(key, value);
      } else {
        StorageUtil.MEMORY_STORAGE[key] = value;
      }
    } catch (err) {
      StorageUtil.MEMORY_STORAGE[key] = value;
    }
  }

  public static get(key: string): string {
    let value;
    if (localStorage) {
      value = localStorage.getItem(key) || StorageUtil.MEMORY_STORAGE[key];
    } else {
      value = StorageUtil.MEMORY_STORAGE[key];
    }
    return value || null;
  }

  public static remove(key: string) {
    if (localStorage) {
      localStorage.removeItem(key);
    }
    delete StorageUtil.MEMORY_STORAGE[key];
  }

  public static setApiToken(apiToken: string) {
    StorageUtil.set(StorageUtil.API_TOKEN, apiToken);
  }

  public static getApiToken() {
    return StorageUtil.get(StorageUtil.API_TOKEN);
  }

  private static readonly API_TOKEN: string = 'API_TOKEN';
  private static readonly MEMORY_STORAGE: any = {};

  private constructor() {

  }
}
