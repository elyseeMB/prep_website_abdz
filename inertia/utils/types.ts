type PropsCurrentUser = { id: string; name: string }
type Props<T> = T extends [] ? Array<T> : T
