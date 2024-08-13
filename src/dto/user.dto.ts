export class UserResponse {
  user_id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type payload = {
  id: string;
};
