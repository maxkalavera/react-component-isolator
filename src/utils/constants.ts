import type { SizeValues } from 'src/components/BackgroundCanvas.d';

export const ZOOM_FRACTIONS = [
  '0.50', 
  '0.75', 
  '0.90', 
  '1.00', 
  '1.25', 
  '1.50', 
  '2.00',
  '5.00',
  '10.00',
] as const;

export const ZOOM_FRACTIONS_MAP = {
  '0.50': '50%',
  '0.75': '75%',
  '0.90': '90%',
  '1.00': '100%',
  '1.25': '125%',
  '1.50': '150%',
  '2.00': '200%',
  '5.00': '500%',
  '10.00': '1000%',
} as const;

export const BACKGROUND_CANVAS_GRID_STEP_UNIT = 10;

/* UUIDS */
export const LOCAL_STORAGE_CONTEXT_ID = '04e7b431-6e23-45df-9314-2798fd459862' as const;
export const SELECTED_ELEMENT_WRAPPER_ID = 'd44e0ece-2d9a-4a52-94eb-097a831359c3' as const;
export const ROOT_ELEMENT_ID = 'a0a8cd1a-59a6-4e0f-bba5-f08dc229f600' as const;

export const SIZE_VALUES_DEFAULT: SizeValues = {
  width: 0,
  paddingLeft: 0,
  paddingRight: 0,
  borderLeft: 0,
  borderRight: 0,
  marginLeft: 0,
  marginRight: 0,
  height: 0,
  paddingTop: 0,
  paddingBottom: 0,
  borderTop: 0,
  borderBottom: 0,
  marginTop: 0,
  marginBottom: 0,
};