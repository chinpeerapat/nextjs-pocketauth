import { pb } from './pocketbase';

export async function signUp(email: string, password: string, name: string) {
  try {
    const data = {
      email,
      password,
      passwordConfirm: password,
      name,
    };
    
    await pb.collection('users').create(data);
    await login(email, password);
  } catch (error) {
    throw new Error('Failed to sign up');
  }
}

export async function login(email: string, password: string) {
  try {
    await pb.collection('users').authWithPassword(email, password);
  } catch (error) {
    throw new Error('Invalid email or password');
  }
}

export function logout() {
  pb.authStore.clear();
}