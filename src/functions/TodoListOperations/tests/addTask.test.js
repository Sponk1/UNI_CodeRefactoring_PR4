import { addTask } from '../addTask';

describe('addTask', () => {
  it('должна добавлять новую задачу в конец списка', () => {
    const tasks = [
      { _id: '1', title: 'Task 1', status: false },
      { _id: '2', title: 'Task 2', status: true },
    ];

    const newTask = { _id: '3', title: 'Task 3', status: false };

    const result = addTask(tasks, newTask);

    expect(result).toEqual([
      { _id: '1', title: 'Task 1', status: false },
      { _id: '2', title: 'Task 2', status: true },
      { _id: '3', title: 'Task 3', status: false },
    ]);
  });

  it('не должна мутировать исходный массив', () => {
    const tasks = [
      { _id: '1', title: 'Task 1', status: false },
    ];

    const newTask = { _id: '2', title: 'Task 2', status: false };

    const result = addTask(tasks, newTask);

    // новый массив
    expect(result).not.toBe(tasks);

    // исходный массив не изменился
    expect(tasks).toEqual([
      { _id: '1', title: 'Task 1', status: false },
    ]);

    // новый task — новая ссылка
    expect(result[1]).toEqual(newTask);
    expect(result[1]).not.toBe(newTask);
  });

  it('должна корректно добавлять задачу даже если список пуст', () => {
    const tasks = [];
    const newTask = { _id: '1', title: 'First task', status: false };

    const result = addTask(tasks, newTask);

    expect(result).toEqual([{ _id: '1', title: 'First task', status: false }]);
  });
});
