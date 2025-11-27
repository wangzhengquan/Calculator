import { ButtonConfig, ButtonType } from './types';

export const BUTTONS: ButtonConfig[] = [
  // Row 1
  { label: 'AC', subLabel: 'AC', value: 'AC', type: ButtonType.ACTION, color: 'red' },
  { label: 'DEL', subLabel: 'DEL', value: 'DEL', type: ButtonType.ACTION, color: 'red' },
  { label: '%', subLabel: 'MOD', value: '%', type: ButtonType.OPERATION },
  { label: '÷', subLabel: 'DIV', value: '/', type: ButtonType.OPERATION },

  // Row 2
  { label: '7', subLabel: '07', value: '7', type: ButtonType.NUMBER },
  { label: '8', subLabel: '08', value: '8', type: ButtonType.NUMBER },
  { label: '9', subLabel: '09', value: '9', type: ButtonType.NUMBER },
  { label: '×', subLabel: 'MUL', value: '*', type: ButtonType.OPERATION },

  // Row 3
  { label: '4', subLabel: '04', value: '4', type: ButtonType.NUMBER },
  { label: '5', subLabel: '05', value: '5', type: ButtonType.NUMBER },
  { label: '6', subLabel: '06', value: '6', type: ButtonType.NUMBER },
  { label: '-', subLabel: 'SUB', value: '-', type: ButtonType.OPERATION },

  // Row 4
  { label: '1', subLabel: '01', value: '1', type: ButtonType.NUMBER },
  { label: '2', subLabel: '02', value: '2', type: ButtonType.NUMBER },
  { label: '3', subLabel: '03', value: '3', type: ButtonType.NUMBER },
  { label: '+', subLabel: 'ADD', value: '+', type: ButtonType.OPERATION },

  // Row 5
  { label: '0', subLabel: '00', value: '0', type: ButtonType.NUMBER },
  { label: '.', subLabel: 'DOT', value: '.', type: ButtonType.NUMBER },
  { label: '=', subLabel: 'EXE', value: '=', type: ButtonType.EQUALS, color: 'black', width: 'double' },
];