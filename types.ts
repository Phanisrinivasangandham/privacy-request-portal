
export enum RequestType {
  DELETE_ACCOUNT = 'Delete my account',
  DELETE_MARKETING = 'Delete marketing data',
  DELETE_ALL = 'Delete all my data'
}

export interface DeletionFormData {
  fullName: string;
  email: string;
  requestType: RequestType;
  additionalDetails: string;
}

export interface AIResponse {
  classification: string;
  isComplete: boolean;
  confirmationMessage: string;
}
