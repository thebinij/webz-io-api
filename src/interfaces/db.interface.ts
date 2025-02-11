export interface IDataIngestionRepository {
    insertBatchData(batch: any): Promise<void>;
  }
