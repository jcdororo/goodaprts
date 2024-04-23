export interface User {
  id?: string;
  password?: string;
  email?: string;
  isSeller?: boolean;
  nickname?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
