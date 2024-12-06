export interface Folder {
  id?: string;
  title: string;
  description?: string;
  creationDate: string;
}

export interface SubFolder {
  id?: string;
  title: string;
  description?: string;
}

export interface NewFolder {
  id?: string;
  title: string;
  description?: string;
  creationDate: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
