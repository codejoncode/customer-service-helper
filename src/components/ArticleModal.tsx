import { Button } from "@mui/material";
import React, { lazy, Suspense, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import LazyIcon from "./LazyIcon";
const CloseIcon = lazy( () => import ("@mui/icons-material/Close"));

interface ArticleModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  open,
  onClose,
  title,
  content,
}) => {
  // Convert markdown-style **Required:** to styled HTML
  const transformedContent = content.replace(
    /\*\*(.*?)\*\*/g,
    `<span style="color: red; font-weight: bold;">$1</span>`
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {title}
        <LazyIcon name={"Close"} fontSize="small" color="inherit"/>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{ __html: transformedContent }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;