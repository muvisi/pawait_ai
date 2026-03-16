import { Drawer, IconButton, styled, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import { FC, ReactNode } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import React from 'react';

interface DrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  children: ReactNode;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DrawerWrap: FC<DrawerProps> = ({ open, setOpen, children }) => {
  const theme = useTheme();

  return (
    <div>
      <Drawer
        anchor="right"
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          zIndex: 9991,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: { xs: 350, md: 500 },
            borderWidth: 0,

            overflow: 'hidden',
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 128, 128, 0.3)',
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'rtl' ? <BsChevronRight /> : <BsChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className="px-8 overflow-x-hidden overflow-y-auto">{children}</div>
      </Drawer>
    </div>
  );
};

export default DrawerWrap;
