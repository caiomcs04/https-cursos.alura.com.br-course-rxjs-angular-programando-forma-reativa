
export interface VolumeInfo {
  title: string,
  authors: Array<string>,
  publisher:string,
   publishedDate:string,
    description: string,
  pageCount: number,
  printType:string,
   mainCategory: string,
  categories: Array<string>,
  averageRating: number,
  ratingsCount: number,
  contentVersion: string,
  imageLinks: ImageLinks,
  language: string,
  infoLink: string,
  canonicalVolumeLink: string,
}

export interface ImageLinks {
   smallThumbnail: string,
   thumbnail: string,
   small: string,
   medium: string,
   large:string,
    extraLarge: string,
}

export interface Item {
  volumeInfor: VolumeInfo
}

export interface LivrosResultado{
  items: Array<Item>,
  totalItems: number
}

export interface Livro{
  title?: string,
  authors?: Array<string>,
  publisher?:string,
   publishedDate?:string,
    description?: string,
    previewLink?: string,
    thumbnail?: ImageLinks
}




