export interface FocusSubtask {
  text: string
  done: boolean
}

export interface FocusTask {
  id: number
  text: string
  subtasks: FocusSubtask[]
}

// Shared state for the task currently being focused on in the Pomodoro page.
// Lets the To-Do list hand a task (and its subtasks) over to /app/pomodoro.
export const useFocusTask = () => useState<FocusTask | null>('focusTask', () => null)
