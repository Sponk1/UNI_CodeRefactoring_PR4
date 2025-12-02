export const editTask = (listTasks, updatedTask) =>
  listTasks.map(t =>
    t._id === updatedTask._id
      ? { ...t, ...updatedTask }
      : t
  );