import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const COLORS = {
    // Primary Colors
    primaryPurple: '#6A0DAD',   // Deep Purple for primary actions and highlights
    secondaryPurple: '#301C58', // Darker Purple for secondary elements
    lightPurple: '#9A57E3',     // Lighter Purple for background highlights
    
    // Accent Colors
    accentBlue: '#1d4ed8',      // Bright Blue for links and call-to-actions
    accentGreen: '#34D399',     // Green for success messages and icons
    accentRed: '#1d4ed8',       // Red for error messages and critical actions
    
    // Background Colors
    backgroundLight: '#F7F9FC', // Light Gray for background
    backgroundDark: '#EDF2F7',  // Slightly darker background for contrast
    backgroundWhite: '#FFFFFF', // Pure White for card backgrounds and content areas
  
    // Text Colors
    textPrimary: '#0A0B0E',     // Almost black for primary text
    textSecondary: '#4B5563',   // Dark Gray for secondary text
    textPurple: '#301C58',      // Dark Purple for text on lighter backgrounds
    
    // Border Colors
    borderGray: '#E5E7EB',      // Light Gray for borders and dividers
    borderPurple: '#9A57E3',    // Light Purple for focused inputs
    
    // Miscellaneous
    white: '#FFFFFF',           // Pure White for various uses
    black: '#000000',           // Pure Black for various uses
    lightGray: '#D1D5DB',       // Light Gray for disabled elements or placeholders
    darkGray: '#374151',        // Dark Gray for subtle text or icons
    shadowColor: '#000000',     // Shadow color for elevated components
    mistyLGray: 'rgba(192, 192, 192, 0.3)', // Light Gray with 30% opacity
    mistyGray: 'rgba(192, 192, 192, 0.1)', // Light Gray with 30% opacity
  };
  
export const SIZES = {
    // global sizes
    icon:20,
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
  
    // font sizes
    largeTitle: 70,
    mediumTitle: 50,
    h0: 40,
    h1: 30,
    h2: 26,
    h3: 16,
    h4: 14,
    h5: 13,
    h6: 10,
    body1: 30,
    body2: 20,
    body3: 17,
    body4: 14,
    body5: 12,
  
    // app dimensions
    width,
    height,
  };