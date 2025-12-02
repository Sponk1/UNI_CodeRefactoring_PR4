import { checkTask } from '../checkTask';

describe('checkTask', () => {
  it('должна инвертировать status только у задачи с указанным id', () => {
    const tasks = [
      { _id: '1', title: 'Task 1', status: false },
      { _id: '2', title: 'Task 2', status: true },
      { _id: '3', title: 'Task 3', status: false },
    ];

    const result = checkTask(tasks, '2');

    expect(result).toEqual([
      { _id: '1', title: 'Task 1', status: false },
      { _id: '2', title: 'Task 2', status: false }, // было true → стало false
      { _id: '3', title: 'Task 3', status: false },
    ]);
  });

  it('не должна изменять массив, если задачи с таким id нет', () => {
    const tasks = [
      { _id: '1', title: 'Task 1', status: false },
      { _id: '2', title: 'Task 2', status: true },
    ];

    const result = checkTask(tasks, '999');

    expect(result).toEqual(tasks);
  });

  it('должна возвращать новый массив (не мутировать исходный)', () => {
    const tasks = [
      { _id: '1', title: 'Task 1', status: false },
      { _id: '2', title: 'Task 2', status: true },
    ];

    const result = checkTask(tasks, '1');

    expect(result).not.toBe(tasks);
    expect(result[0]).not.toBe(tasks[0]);
    expect(result[1]).toBe(tasks[1]);
  });
});
