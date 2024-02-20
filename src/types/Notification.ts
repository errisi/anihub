export interface Notification {
  id: number;
  content: string;
  status: 'viewed' | 'not viewed';
  userId: number;
}
