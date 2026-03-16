import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';

type DialogType = 'info' | 'warning';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type?: DialogType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const iconMap: Record<DialogType, React.ReactNode> = {
  info: <InfoOutlinedIcon fontSize="large" color="info" />,
  warning: <WarningAmberOutlinedIcon fontSize="large" color="warning" />,
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  type = 'info',
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={!isLoading ? onClose : undefined}
      maxWidth="xs"
      fullWidth
      aria-labelledby="confirmation-dialog-title"
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Box display="flex" justifyContent="center" mb={1}>
          {iconMap[type]}
        </Box>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" align="center">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button onClick={onClose} variant="outlined" disabled={isLoading}>
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          className={`!bg-primary !text-white`}
          disabled={isLoading}
          startIcon={
            isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : undefined
          }
        >
          {isLoading ? 'Processing...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
