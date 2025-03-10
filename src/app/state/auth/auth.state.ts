import { User } from '../../core/models/user.interface';

export interface UserSession {
  user: User;
  token: string;
}

export interface AuthState {
  session: UserSession | null;
  error: string | null;
}

export const initialState: AuthState = {
  session: null,
  error: null
};
