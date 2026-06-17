enum States {
  DRAFT = 1,
  INREVIEW = 2,
  UNLISTED = 3,
  PRIVATE = 4,
  PUBLIC = 5,
  ARCHIVED = 6,
  DECLINED = 7,
  INPROGRESS = 8,
}

export const ArticleStatusText: Record<States, string> = {
  [States.DRAFT]: 'Draft',
  [States.INREVIEW]: 'In Review',
  [States.UNLISTED]: 'Unlisted',
  [States.PRIVATE]: 'Private',
  [States.PUBLIC]: 'Public',
  [States.ARCHIVED]: 'Archived',
  [States.DECLINED]: 'Declined',
  [States.INPROGRESS]: 'In Progress',
} as const

export default States
