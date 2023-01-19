export interface IDataService {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}
