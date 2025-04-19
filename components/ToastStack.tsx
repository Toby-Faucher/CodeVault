"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface ToastStackProps {
  showAddToast: boolean;
  showEditToast: boolean;
  showDeleteToast: boolean;
  showFolderAddToast: boolean;
  showFolderDeleteToast: boolean;
}

const ToastStack: React.FC<ToastStackProps> = ({
  showAddToast,
  showEditToast,
  showDeleteToast,
  showFolderAddToast,
  showFolderDeleteToast,
}) => (
  <AnimatePresence>
    {showAddToast && (
      <motion.div
        key="add-toast"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
        className="fixed bottom-4 right-4 z-50 bg-base-100 text-base-content px-6 py-4 rounded shadow-lg border-2 border-primary"
        style={{ minWidth: '180px', textAlign: 'center', fontSize: '1.15rem' }}
      >
        <span className="font-semibold text-primary">Snippet added!</span>
      </motion.div>
    )}
    {showEditToast && (
      <motion.div
        key="edit-toast"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
        className="fixed bottom-4 right-4 z-50 bg-base-100 text-base-content px-6 py-4 rounded shadow-lg border-2 border-primary"
        style={{ minWidth: '180px', textAlign: 'center', fontSize: '1.15rem' }}
      >
        <span className="font-semibold text-primary">Snippet updated!</span>
      </motion.div>
    )}
    {showDeleteToast && (
      <motion.div
        key="delete-toast"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
        className="fixed bottom-4 right-4 z-50 bg-base-100 text-base-content px-6 py-4 rounded shadow-lg border-2 border-primary"
        style={{ minWidth: '180px', textAlign: 'center', fontSize: '1.15rem' }}
      >
        <span className="font-semibold text-primary">Snippet deleted!</span>
      </motion.div>
    )}
    {showFolderAddToast && (
      <motion.div
        key="folder-add-toast"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
        className="fixed bottom-4 right-4 z-50 bg-base-100 text-base-content px-6 py-4 rounded shadow-lg border-2 border-primary"
        style={{ minWidth: '180px', textAlign: 'center', fontSize: '1.15rem' }}
      >
        <span className="font-semibold text-primary">Folder added!</span>
      </motion.div>
    )}
    {showFolderDeleteToast && (
      <motion.div
        key="folder-delete-toast"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
        className="fixed bottom-4 right-4 z-50 bg-base-100 text-base-content px-6 py-4 rounded shadow-lg border-2 border-primary"
        style={{ minWidth: '180px', textAlign: 'center', fontSize: '1.15rem' }}
      >
        <span className="font-semibold text-primary">Folder deleted!</span>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ToastStack;
