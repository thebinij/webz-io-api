import { PostModel } from "@models/postModel"; 

export class DataIngestionRepository {
  public async insertBatchData(batch: any): Promise<void> {
    try {
      // Assuming `PostModel.bulkCreate` is the method to insert multiple records at once
      await PostModel.bulkCreate(batch, { ignoreDuplicates: true });
    } catch (error) {
      console.error("Database insertion error:", error);
      throw new Error("Database insert failed");
    }
  }
}
