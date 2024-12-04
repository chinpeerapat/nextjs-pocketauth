import PocketBase from 'pocketbase';

// Use environment variable for PocketBase URL in production
const PB_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';

export const pb = new PocketBase(PB_URL);

export type AuthModel = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

export type AuthResponse = {
  token: string;
  user: AuthModel;
};