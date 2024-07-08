import type {
  PortableTextBlock,
  PortableTextMarkDefinition,
  PortableTextSpan,
} from "@portabletext/types";

export interface PostItem {
  name: string;
  slug: string;
  content: PortableTextBlock<
    PortableTextMarkDefinition,
    PortableTextSpan,
    string,
    string
  >[];
  image: ImageMetadata;
  date: string;
  author: string;
  category: string;
  featured: boolean;
  tags: string[];
}
