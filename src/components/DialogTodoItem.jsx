import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import {
  getInitialTask,
  normalizeStatusValue,
} from '../functions/DialogTodoItemUtils';

const DialogTodoItem = ({ mode, open, setOpen, handleSubmit, taskEdited }) => {
  const isEditMode = mode === 'edit';

  const [task, setTask] = useState(() => getInitialTask(mode, taskEdited));
  const [dateOpen, setDateOpen] = useState(false);

  // каждый раз при открытии диалога обновляем состояние
  useEffect(() => {
    if (!open) return;
    setTask(getInitialTask(mode, taskEdited));
  }, [open, mode, taskEdited]);

  const handleClose = () => {
    setOpen(false);
    setDateOpen(false);
  };

  const handleChangeTask = (e) => {
    const { name, value } = e.target;

    setTask(prev => ({
      ...prev,
      [name]: name === 'status' ? normalizeStatusValue(value) : value,
    }));
  };

  const handleChangeDateTask = (date) => {
    setTask(prev => ({
      ...prev,
      deadline: date,
    }));
  };

  const submitHandler = () => {
    handleSubmit(task);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>{isEditMode ? 'Edit' : 'Add'} Task</DialogTitle>
      <DialogContent className="my-2 ">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            '& .MuiTextField-root': { my: 2.5 },
          }}
        >
          <TextField
            name="title"
            autoFocus
            label="Title"
            type="text"
            fullWidth
            value={task.title}
            onChange={handleChangeTask}
            required
          />

          <TextField
            name="status"
            select
            label="Status"
            fullWidth
            value={task.status}
            onChange={handleChangeTask}
            required
          >
            <MenuItem value={false}>Incomplete</MenuItem>
            <MenuItem value={true}>Completed</MenuItem>
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date & Time"
              value={task.deadline}
              open={dateOpen}
              onOpen={() => setDateOpen(true)}
              onClose={() => setDateOpen(false)}
              onChange={handleChangeDateTask}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  onClick={() => setDateOpen(true)}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <button
          onClick={handleClose}
          className="bg-gray-300 hover:bg-gray-200 text-gray-600 font-medium rounded-md px-5 py-2"
        >
          Cancel
        </button>
        <button
          onClick={submitHandler}
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md px-5 py-2"
        >
          {isEditMode ? 'Edit' : 'Add'} Task
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogTodoItem;
