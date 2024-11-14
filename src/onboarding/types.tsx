export interface TextProps {
  $fontSize?: number;
  $fontWeight?: number;
  $lineHeight?: number;
  $color?: string;
  children: string;
  $marginBottom?: number;
}

export interface ButtonProps {
  disabled?: boolean;
  autofocus?: boolean;
  children: string;
  onClick(event:React.MouseEvent<HTMLElement, MouseEvent>): void;
}

export interface StepModaContent {
  description: string;
  title: string;
  imageSrc?: string;
}
