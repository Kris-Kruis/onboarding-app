import { STEP_MODAL_CONTENT } from '../data'
import { StepModaContent } from './types'

export const getStepModaContent = (stepName: string): StepModaContent => {
  const stepContent = STEP_MODAL_CONTENT[stepName]
  
  return stepContent !== undefined ? stepContent : {
    description: `Описание блока "${stepName}"`,
    title: `Заголовок блока "${stepName}"`,
  }
}

export const getStepItemId = (target: string | HTMLElement, index: number): string => {
  return typeof target === 'string' ? target.slice(1) : `${index}`
}
