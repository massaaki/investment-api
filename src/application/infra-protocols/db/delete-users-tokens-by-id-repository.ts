export interface IDeleteUsersTokensByIdRepository {
  deleteById(id: string): Promise<void>

}