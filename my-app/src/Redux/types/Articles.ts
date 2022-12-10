export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  userId: string;
  type: string[];
  blocks: Block[];
}

export interface Block {
  id: string;
  type: string;
  title: string;
  paragraphs: string[];
  code: string;
  src: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  userId: string;
  type: string[];
  blocks: Block[];
}
