import { ElementType } from "react";

export interface PrivateOutletProps {
  isAuthProtected: boolean;
  Component: ElementType;
  Layout: ElementType;
}
