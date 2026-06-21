import Image from 'next/image';
import { Callout } from './Callout';

const components = {
  Image,
  Callout,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  return <div />;
}
