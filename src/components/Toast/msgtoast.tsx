import { Alert, AlertTitle } from '@mui/material';
import toast from 'react-hot-toast';

export const showNotificationToast = (
  message: string,
  type: 'success' | 'error' | 'info'
) => {
  toast.custom(
    <div
      className="info-card max-w-xs w-full p-4 shadow-lg rounded-xl animate-slide-in-right dark:bg-gray-800"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        border: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <Alert
        severity={type}
        className="w-full"
        sx={{
          padding: '8px 12px',
          fontSize: '0.875rem',
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          backgroundColor:
            type === 'success'
              ? '#e6f4ea'
              : type === 'error'
              ? '#fdecea'
              : '#e0f0ff',
          color:
            type === 'success'
              ? '#256029'
              : type === 'error'
              ? '#b71c1c'
              : '#055160',
        }}
      >
        <AlertTitle className="font-semibold">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </AlertTitle>
        {message}
      </Alert>
    </div>,
    {
      duration: 5000,
      position: 'top-right',
      style: { margin: 0, padding: 0, background: 'transparent' },
    }
  );
};
