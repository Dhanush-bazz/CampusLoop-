export function readStoredJSON<T>(
  key: string,
  isValid: (value: unknown) => value is T,
): T | undefined {
  try {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return undefined;

    const value: unknown = JSON.parse(storedValue);
    if (isValid(value)) return value;

    console.warn(`Ignoring invalid saved CampusLoop data for "${key}".`);
  } catch (error) {
    console.error(`Unable to read saved CampusLoop data for "${key}".`, error);
  }
  return undefined;
}

export function writeStoredJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Unable to save CampusLoop data for "${key}".`, error);
  }
}

export function removeStoredValues(keys: string[]): void {
  try {
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Unable to clear saved CampusLoop demo data.", error);
  }
}
