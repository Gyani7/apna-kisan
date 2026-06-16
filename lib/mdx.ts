import fs from 'fs';
import path from 'path';

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  
  if (!match) {
    return { metadata: {} as Record<string, string>, content: fileContent };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const metadata: Record<string, string> = {};

  frontMatterLines.forEach(line => {
    const [key, ...valueArr] = line.split(': ');
    if (key) {
      let value = valueArr.join(': ').trim();
      value = value.replace(/^['"](.*)['"]$/, '$1');
      metadata[key.trim()] = value;
    }
  });

  return { metadata, content };
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
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
