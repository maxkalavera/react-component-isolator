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
export const BACKGROUND_CANVAS_THIN_LINE_WIDTH = 1;
export const BACKGROUND_CANVAS_LINE_WIDTH = 2;
export const BACKGROUND_CANVAS_FRAME_WIDTH = 24; // px
export const DIVIDER_DEFAULT_WIDTH = 191; // px
export const DIVIDER_MIN_WIDTH = 0; // px
export const DIVIDER_MAX_WIDTH = 1024; // px

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

  'primary': '#1FA9CF',
  'primary-contrast': '#886d66',
  'primary-100': '#bce9f5',
  'primary-200': '#90daee',
  'primary-300': '#64cbe8',
  'primary-400': '#37bce1',
  'primary-500': '#1FA9CF',
  'primary-600': '#1ea3c8',
  'primary-700': '#177f9b',
  'primary-800': '#115b6f',
  'primary-900': '#0a3643',

  'size-frame-position-line': '#ff524a50',
  'size-frame-margin': '#1ee19650',
  'size-frame-border': '#e1341e50',
  'size-frame-padding': '#1e6ae150',
  'size-frame-content': '#1FA9CF50',
};

export const LOCAL_STORAGE_CONTEXT_ID = '04e7b431-6e23-45df-9314-2798fd459862' as const;