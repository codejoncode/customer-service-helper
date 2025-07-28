import React, { lazy, Suspense } from "react";
// import { SvgIconProps } from "@mui/material";
import * as Icons from "@mui/icons-material";

interface LazyIconProps {
  name: string;
  fontSize?: string;
  color?: string;
  props?: React.ComponentProps<typeof Icons.Info>; 
}

const LazyIcon: React.FC<LazyIconProps> = ({ name, props }: LazyIconProps) => {
  const Icon = Icons[name as keyof typeof Icons];

  return (
    <Suspense fallback={<span style={{ width: 24, height: 24 }} />}>
      {Icon ? <Icon {...props} /> : <span>🚫 Icon not found</span>}
    </Suspense>
  );
};

export default LazyIcon;