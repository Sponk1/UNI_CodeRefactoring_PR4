import { sortTask, SORT_MODES } from '../sortTask';

describe('sortTask', () => {
  const tasks = [
    { _id: '1', title: 'Task 1', status: false },
    { _id: '2', title: 'Task 2', status: true },
    { _id: '3', title: 'Task 3', status: false },
  ];

  it('должна возвращать все задачи при режиме ALL', () => {
    const result = sortTask(tasks, SORT_MODES.ALL);

    expect(result).toEqual(tasks);
  });

  it('должна возвращать только НЕвыполненные задачи при режиме INCOMPLETE', () => {
    const result = sortTask(tasks, SORT_MODES.INCOMPLETE);

    expect(result).toEqual([
      { _id: '1', title: 'Task 1', status: false },
      { _id: '3', title: 'Task 3', status: false },
    ]);
  });

  it('должна возвращать только выполненные задачи при режиме COMPLETED', () => {
    const result = sortTask(tasks, SORT_MODES.COMPLETED);

    expect(result).toEqual([
      { _id: '2', title: 'Task 2', status: true },
    ]);
  });

  it('должна возвращать все задачи при неизвестном режиме', () => {
    const result = sortTask(tasks, 'UNKNOWN_MODE');

    expect(result).toEqual(tasks);
  });

  it('не должна мутировать исходный массив', () => {
    const copy = [...tasks]; 
    const result = sortTask(tasks, SORT_MODES.INCOMPLETE);

    expect(tasks).toEqual(copy);       
    expect(result).not.toBe(tasks);    
  });
});
