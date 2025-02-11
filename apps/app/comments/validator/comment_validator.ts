import vine from '@vinejs/vine'

export const commentValidator = vine.compile(
  vine.object({
    articleIs: vine.number().optional(),
    body: vine.string().trim(),
  })
)
