export const SORT_MODES = {
  ALL: 'All',
  INCOMPLETE: 'Incomplete',
  COMPLETED: 'Complete'
};

const sortStrategies = {
  [SORT_MODES.ALL]: (tasks) => tasks,

  [SORT_MODES.INCOMPLETE]: (tasks) =>
    tasks.filter(t => !t.status),

  [SORT_MODES.COMPLETED]: (tasks) =>
    tasks.filter(t => t.status),
};

export const sortTask = (tasks, mode) => {
  const strategy = sortStrategies[mode] || sortStrategies[SORT_MODES.ALL];
  return strategy(tasks);
};
