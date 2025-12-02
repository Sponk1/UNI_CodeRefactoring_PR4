export const deleteTask = (listTasks, id) => {
    return listTasks.filter(task => task._id !== id);
}
