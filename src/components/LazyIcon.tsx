import React, { lazy, Suspense } from "react";
import { SvgIconProps } from "@mui/material";

interface LazyIconProps extends SvgIconProps {
  name: string;
}

const LazyIcon: React.FC<LazyIconProps> = ({ name, ...props }) => {
  const Icon = lazy(() => import(`@mui/icons-material/${name}`));

  return (
    <Suspense fallback={<span style={{ width: 24, height: 24 }} />}>
      <Icon {...props} />
    </Suspense>
  );
};

export default LazyIcon;