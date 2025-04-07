import vine from '@vinejs/vine'

export const emailRule = () => vine.string().maxLength(254).email().normalizeEmail()

export const loginValidator = vine.compile(
  vine.object({
    email: emailRule(),
    password: vine.string().minLength(8),
    remember: vine.boolean().optional(),
  })
)
