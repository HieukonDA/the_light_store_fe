export interface ResponseRecord<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IBaseEntity {
  CreatedDate?: string;
  CreatedBy?: string;
  UpdatedDate?: string;
  UpdatedBy?: string;
  IsActive?: boolean;
}

