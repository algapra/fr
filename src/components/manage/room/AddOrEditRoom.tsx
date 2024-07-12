import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button } from '@mui/material';

const AddOrEditRoomDialog = ({ open, onClose, isEditMode }: any) => {
  const handleSubmit = () => {
    if (isEditMode) {
      // Handle edit form submission
    } else {
      // Handle add form submission
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='add-or-edit-room'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      aria-describedby='add-or-edit-room-description'
    >
      <DialogTitle
        id='add-or-edit-room'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        {isEditMode ? 'Edit Room' : 'Add Room'}
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <form>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Floor'
                placeholder='11'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Room'
                placeholder='Room Engineer'
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
          {isEditMode ? 'Save' : 'Create'}
        </Button>
        <Button variant='outlined' color='secondary' onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditRoomDialog;
