enum Status {
  IN_PROGRESS = 1,
  COMPLETE = 2,
  OUTDATED = 3,
  ARCHIVED = 4,
}

export const StatusDesc: Record<Status, string> = {
  [Status.IN_PROGRESS]: 'In Propress',
  [Status.COMPLETE]: 'Completed',
  [Status.OUTDATED]: 'Outdated',
  [Status.ARCHIVED]: 'Archived',
}

export default Status
