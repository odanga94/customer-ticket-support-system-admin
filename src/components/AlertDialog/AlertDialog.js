import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        { props.loading? <Spinner/> :
          <Aux>
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to finalize this ticket?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Finalizing this ticket implies permanenetly removing it from pending tickets and changing its status to finished.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={props.finalizeTicket} color="primary">
                Confirm
              </Button>
              <Button onClick={props.closeDialog} color="primary" autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Aux>
        }
      </Dialog>
    </div>
  );
}