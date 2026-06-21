import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(rawContent);
  return { metadata: data, content };
}

export function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map(file => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      ...metadata,
      slug,
      slugAsParams: slug,
      body: content,
      title: metadata.title ?? 'Untitled Post',
      date: metadata.date ?? new Date().toISOString(),
      description: metadata.description ?? '',
      author: metadata.author ?? 'Unknown Author',
    };
  });
}
