export function hasProperty<T>(object: T, property: keyof T): boolean {
    return property in object;
}
