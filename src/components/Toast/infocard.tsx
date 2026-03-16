import { Alert } from '@mui/material';
import toast from 'react-hot-toast';

export const infocards = (message: string, type: string) => {
  switch (type) {
    case 'error':
      toast.custom(
        <div className="info-card">
          <Alert severity="error"> {message}</Alert>
        </div>,
        {
          duration: 4000, // Adjust duration as needed
          style: {
            borderRadius: '8px', // Optional: Customize card appearance
          },
          iconTheme: {
            primary: '#FF5252', // Customize icon color if needed
            secondary: '#DF2E2E', // Customize icon background color if needed
          },
        }
      );
      break;
    case 'success':
      toast.custom(
        <div className="info-card bg-gradient-to-br from-blue-50 p-5 via-white to-white dark:bg-dash-dark rounded-xl">
          <div>{message}</div>
        </div>,
        {
          duration: 4000, // Adjust duration as needed
          style: {
            borderRadius: '8px', // Optional: Customize card appearance
          },
          iconTheme: {
            primary: '#4CAF50', // Customize icon color if needed
            secondary: '#2D8F29', // Customize icon background color if needed
          },
        }
      );
      break;
  }
};
