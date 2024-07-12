import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import { useDepartment } from '@/src/hooks/useDepartment';

const DialogConfirmation = ({ open, onClose, isDeleted, id }: any) => {
  const { refreshDepartments, deleteDepartment } = useDepartment();

  const handleSubmit = () => {
    if (isDeleted) {
      deleteDepartment(id).then(() => {
        refreshDepartments();
      });
    } else {
      // Handle add form submission
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='add-or-edit-department'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      aria-describedby='add-or-edit-department-description'
    >
      <DialogTitle
        id='add-or-edit-department'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`,
          ],
          pt: theme => [
            `${theme.spacing(8)} !important`,
            `${theme.spacing(12.5)} !important`,
          ],
        }}
      >
        Are you sure to delete this ?
      </DialogTitle>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`,
          ],
          pb: theme => [
            `${theme.spacing(8)} !important`,
            `${theme.spacing(12.5)} !important`,
          ],
        }}
      >
        <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}>
          Yes
        </Button>
        <Button variant='outlined' color='secondary' onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmation;
