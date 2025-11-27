export type Operation = '+' | '-' | '*' | '/' | '%' | null;

export interface CalculatorState {
  currentOperand: string;
  previousOperand: string | null;
  operation: Operation;
}

export enum ButtonType {
  NUMBER = 'NUMBER',
  OPERATION = 'OPERATION',
  ACTION = 'ACTION',
  EQUALS = 'EQUALS'
}

export interface ButtonConfig {
  label: string;
  subLabel?: string;
  value: string;
  type: ButtonType;
  color?: 'red' | 'default' | 'black';
  width?: 'normal' | 'double';
}