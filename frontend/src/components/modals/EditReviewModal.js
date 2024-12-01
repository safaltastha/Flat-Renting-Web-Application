import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EditReviewModal({ reviewId, review, onSave, onClose, fetchReviews }) {
  const [editedText, setEditedText] = React.useState(review.text);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const  propertyId  = useParams();

  const handleSave = async () => {
    console.log(review, "review");
    console.log(reviewId, "reviewId");
    console.log(editedText, "editedText");
    console.log(propertyId.id, "propertyId");
    onSave(editedText); // Save the edited text
    try {
      // Make the API call to save the updated review
      const response = await axios.put(
        `http://localhost:3002/ratings/review/${reviewId}`,

        {
          propertyId: propertyId.id, // Include the review ID to ensure you're updating the correct review
          review: editedText, // Include the updated review text
        },
        {
          withCredentials: true,
        }
      );

      // Handle successful save response
      if (response.status === 200) {
        console.log("Review saved successfully");
        onSave(editedText); // Call the onSave prop to update the state in the parent component
        onClose(); // Close the modal after saving
      }
      fetchReviews()
    } catch (err) {
      console.error("Error saving the review:", err);
      setError("Failed to save the review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit Review
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <TextareaAutosize
          minRows={4}
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          style={{ width: "100%" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save changes</Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
