import { CSSProperties } from "react";
import colors from "./colors";

export const centered: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const centeredPainel: CSSProperties = {
  verticalAlign: 'middle',
  width: '400px',
  margin: '80px auto',
};

export const bordered: CSSProperties = {
  border: 'solid 2px',
  borderRadius: 5,
  borderColor: colors.gray,
  boxShadow: '0 2px 12px 0 rgba(0,0,0,.06)',
};

export const halfWidth: CSSProperties = {
  margin: '0 auto',
  width: '50%',
};

export const smallPadded: CSSProperties = {
  padding: '10px',
};

export const largePadded: CSSProperties = {
  padding: '30px',
};
