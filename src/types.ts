export type Tags = {
  id: number;
  name: string;
  color: string;
};
export type Hashtag = {
  id: number;
  name: string;
};
export type Content = {
  link: string;
  title: string;
  description: string;
  image: string;
  tags: Tags[];
  thumbnail: string;
  hashtags: Hashtag[];
};

export type LinklotData = {
  tags: Tags[];
  content: Content[];
};
