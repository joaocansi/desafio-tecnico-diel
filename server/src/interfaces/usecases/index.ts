export default interface Usecase<T, K> {
  execute(data: T): Promise<K>;
}
