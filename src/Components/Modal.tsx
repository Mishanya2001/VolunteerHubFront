import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  h1CustomClass: string;
  onClose: () => void;
}

function Modal({ children, title, h1CustomClass, onClose }: ModalProps) {
  return (
    <>
      <div
        className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"
        onClick={onClose}
      ></div>
      <div className="w-[38.5em] p-5 rounded bg-white fixed top-10 left-1/2 -translate-x-1/2">
        <h1 className={h1CustomClass}>{title}</h1>
        {children}
      </div>
    </>
  );
}

export default Modal;
