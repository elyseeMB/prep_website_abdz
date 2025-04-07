import vine from '@vinejs/vine'

export const articleIndexValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    perPage: vine.number().max(100).optional(),
  })
)
