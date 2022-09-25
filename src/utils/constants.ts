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

/* Style */
export const BACKGROUND_CANVAS_LINE_WIDTH = 1;
export const BACKGROUND_CANVAS_FRAME_WIDTH = 24; // px

// Colors

export const COLORS = {
  'black': '#000000',
  'white': '#FFFFFF',
  'background': '#FFFFFF',
  'red': '#ff524a',
  'gray': '#9E9E9E',
  'gray-contrast': '#FFFFFF',
  'gray-50': '#FAFAFA',
  'gray-100': '#F5F5F5',
  'gray-200': '#EEEEEE',
  'gray-300': '#E0E0E0',
  'gray-400': '#BDBDBD',
  'gray-500': '#9E9E9E',
  'gray-600': '#757575',
  'gray-700': '#616161',
  'gray-800': '#424242',
  'gray-900': '#212121',
};
