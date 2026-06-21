import { getMDXData } from '../mdx';
import path from 'path';
import { Post } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export const allPosts: Post[] = getMDXData(contentDirectory);
