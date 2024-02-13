export interface User {
  accessToken: string;

  user: {
    id: number;
    name: string;
    email: string;
    age: string | null;
    sex: 'm' | 'f';
    about: string | null;
    role: {
      current: 'user' | 'premium' | 'admin' | 'moderator';
      period: string | null;
    };
    friends: number[];
    achievements: number[];
    avatar: string;
    wallpaper: string;
    status: {
      current: 'active' | 'limited' | 'blocked';
      period: string | null;
    };
    activationToken: string | null;
    refreshToken: string | null;
  };
}
