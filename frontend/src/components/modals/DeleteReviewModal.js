import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({openReviewDeleteModal, setOpenReviewDeleteModal, onConfirm}) {
  
console.log(openReviewDeleteModal, ' openReviewModal')
  return (
    <React.Fragment>
    
      <Dialog
        open={openReviewDeleteModal}
        onClose={()=>setOpenReviewDeleteModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenReviewDeleteModal(false)}>Cancel</Button>
          <Button onClick={onConfirm}  autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}
