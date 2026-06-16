'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import { components } from '@/components/mdx-components';

export function MdxRenderer({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);

  return <MDXContent components={components} />;
}
