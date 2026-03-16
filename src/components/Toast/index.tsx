import { Alert } from '@mui/material';
import toast from 'react-hot-toast';

export const notify = (message: string, type: 'success' | 'error') => {
  toast.custom(
    (t) => (
      <div
        className={`fixed bottom-6 right-6 z-[99999] transition-transform duration-300 ${
          t.visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <Alert
          severity={type}
          variant="filled"
          sx={{
            boxShadow: 6,
            minWidth: 280,
            maxWidth: '90vw',
            borderRadius: 1,
          }}
        >
          {message}
        </Alert>
      </div>
    ),
    {
      duration: 4000,
    }
  );
};
