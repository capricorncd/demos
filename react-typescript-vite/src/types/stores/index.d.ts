/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-03 10:45 (GMT+0900)
 */
import store from '@/stores'

export * from './counter'
export * from './data'

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
