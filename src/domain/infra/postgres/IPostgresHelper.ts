export interface IPostgresHelper {
  query (textQuery: string, params?: any): Promise<any>
  close (): Promise<void>
}
