/** @format */

export interface CalendarProps {
  date: Date;
  setDate: (date: Date) => void;
  onOk?: () => void;
  onCancel?: () => void;
}
