export interface Post {
  slug: string;
  title: string;
  description?: string;
  published: boolean;
  content: string;
  slugAsParams: string;
}