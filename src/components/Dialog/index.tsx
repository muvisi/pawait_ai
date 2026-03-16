import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

interface ResponsiveDialogProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Dialogwrapper: React.FC<ResponsiveDialogProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      className="  !p-2"
      fullWidth
      PaperProps={{
        sx: {
          mx: 2, // horizontal margin on xs screens
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: '90vh', // optional: limit max height so it doesn't fill entire screen vertically
        },
      }}
    >
      {title && (
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {title}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon className="text-primary" />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent className="!flex !justify-center items-center !w-full h-full  ">
        {children}
      </DialogContent>

      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};
