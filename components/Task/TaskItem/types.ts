/** @format */

export interface ITask {
  id: string;
  title: string;
  isDone: boolean;
  isLast?: boolean;
  isDisabled?: boolean;
  updatedAt: number;
  createdAt: number;
}
