enum CollectionTypes {
  SERIES = 1,
  COURSE = 2,
  PLAYLIST = 3,
  PATH = 4,
}

export const CollectionTypesDesc: Record<CollectionTypes, string> = {
  [CollectionTypes.SERIES]: 'Series',
  [CollectionTypes.COURSE]: 'Course',
  [CollectionTypes.PLAYLIST]: 'Playlist',
  [CollectionTypes.PATH]: 'Path',
}

export default CollectionTypes
