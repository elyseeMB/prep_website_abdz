export const UserRole = {
  User: 1,
  Admin: 2,
  CONTRIBUTOR_LVL_1: 3,
  CONTRIBUTOR_LVL_2: 4,
} as const

export type IUserRole = (typeof UserRole)[keyof typeof UserRole]

export const UserRoleText = {
  [UserRole.User]: 'User',
  [UserRole.Admin]: 'Admin',
} as const
