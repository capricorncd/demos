/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/11 17:12:07 (GMT+0900)
 *
 * React hooks
 */
let isMounted = false
let workInProgressHook = null

const fiber = {
  stateNode: App,
  memoizedState: null
}

function schedule() {
  workInProgressHook = fiber.memoizedState
  const app = fiber.stateNode()
  if (!isMounted) {
    isMounted = true
  }
  return app
}

function useState(initialState) {
  // linked list
  let hook
  // initial
  if (!isMounted) {
    hook = {
      memoizedState: initialState,
      next: null,
      queue: {
        pending: null
      }
    }
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook
    } else {
      workInProgressHook.next = hook
    }
    workInProgressHook = hook
  }
  // update
  else {
    hook = workInProgressHook
    workInProgressHook = workInProgressHook.next
  }

  // todo
  let baseState = hook.memoizedState
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next

    do {
      const action = firstUpdate.action
      baseState = action(baseState)
      firstUpdate = firstUpdate.next
    } while (firstUpdate !== hook.queue.pending.next)

    hook.queue.pending = null
  }

  hook.memoizedState = baseState
  return [baseState, dispatchAction.bind(null, hook.queue)]
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null
  }

  if (queue.pending === null) {
    update.next = update
  } else {
    update.next = queue.pending.next
    queue.pending.next = update
  }
  queue.pending = update

  schedule()
}

function App() {
  const [count, setCount] = useState(0)

  console.log('isMounted:', isMounted);
  console.log('count:', count);

  return {
    add() {
      setCount(old => old + 1)
    }
  }
}

window.app = schedule()