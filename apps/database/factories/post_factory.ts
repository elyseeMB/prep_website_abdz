import factory from '@adonisjs/lucid/factories'

const youtubeUrls = [
  'https://www.youtube.com/watch?v=Npn-2qweD5k',
  'https://www.youtube.com/watch?v=q0I3bzYUE1A',
  'https://www.youtube.com/watch?v=zvK4-suEKnM',
  'https://www.youtube.com/watch?v=0AGHmWdnsVM',
  'https://www.youtube.com/watch?v=NdLzhFINrW4',
  'https://www.youtube.com/watch?v=KfkBAYgwAxA',
  'https://www.youtube.com/watch?v=7HyCMmjO9zQ',
  'https://www.youtube.com/watch?v=BPjvak_kB3U',
  'https://www.youtube.com/watch?v=OieU-z4orBk',
]

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    return {}
  })
  .build()
