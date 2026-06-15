import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '@/types/post'

const POSTS_PATH = path.join(process.cwd(), 'content/blog')

export function getPosts(): Post[] {
  const fileNames = fs.readdirSync(POSTS_PATH)
  const posts = fileNames.map(fileName => {
    const fullPath = path.join(POSTS_PATH, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const slug = fileName.replace(/\.mdx?$/, '')

    return {
      ...data,
      slug,
      content,
      slugAsParams: slug,
      published: data.published !== false, 
    } as Post
  })
  return posts
}

export const posts = getPosts()
