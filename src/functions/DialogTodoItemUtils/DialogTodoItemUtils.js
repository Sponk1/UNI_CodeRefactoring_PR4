// src/functions/DialogTodoItemUtils.js
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

export const DEFAULT_DEADLINE = dayjs('2018-08-18T21:11:54');

export const createEmptyTask = () => ({
  _id: uuid(),
  title: '',
  status: false,
  deadline: DEFAULT_DEADLINE,
});

// начальное состояние формы в зависимости от режима
export const getInitialTask = (mode, taskEdited) => {
  if (mode === 'edit' && taskEdited) {
    return taskEdited;
  }
  return createEmptyTask();
};

// нормализация значения статусa из <select>
export const normalizeStatusValue = (raw) => {
  // может прийти как строка или boolean
  if (raw === true || raw === 'true') return true;
  if (raw === false || raw === 'false') return false;
  return !!raw;
};
