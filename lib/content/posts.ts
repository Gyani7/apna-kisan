import { getMDXData } from '../mdx';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export const allPosts = getMDXData(contentDirectory);
