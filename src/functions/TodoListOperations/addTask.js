export const addTask = (listTasks, task) => {
  return [
    ...listTasks,
    {
      ...task,
    },
  ];
};