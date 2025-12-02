export const checkTask = (listTasks, id) =>
  listTasks.map(t =>
    t._id === id
      ? { ...t, status: !t.status }
      : t
  );