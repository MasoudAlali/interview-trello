/**
 * Service which is wrapper to storage which is used in current platform (localStorage, AsyncStorage, ...)
 * * Maybe we need to change methods to be Async if we want to use some other tools
 */
class StorageService {
  get(key: string): any | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear(): void {
    localStorage.clear();
  }
}

export default new StorageService();
