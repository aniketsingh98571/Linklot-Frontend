export type Tags = {
  id: number;
  name: string;
  color: string;
};
export type Content = {
  link: string;
  title: string;
  description: string;
  image: string;
  tags: Tags[];
  thumbnail: string;
  hashtags: string[];
};

export type LinklotData = {
  tags: Tags[];
  content: Content[];
};
