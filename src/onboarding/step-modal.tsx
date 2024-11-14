import * as Styled from './styled'
import { getStepModaContent } from './utils'
import type { TooltipRenderProps } from 'react-joyride'

function StepModal(props: TooltipRenderProps) {
  const { tooltipProps, step, index, size: stepsCount, primaryProps, backProps, closeProps, skipProps } = props

  const stepName = typeof step.target === 'string' ? step.target.slice(1) : ''
  const currentStep = index + 1

  const stepModalContent = getStepModaContent(stepName)

  return (
    <Styled.StepsModal {...tooltipProps}>
      <Styled.Text $fontSize={14} $fontWeight={700} $lineHeight={1.1} $color='#c8c8c8' $marginBottom={12}>
        {`Шаг ${currentStep} из ${stepsCount}`}
      </Styled.Text>

      <Styled.Text $fontSize={16} $fontWeight={700} $lineHeight={1.3} $marginBottom={10}>
        {stepModalContent.title}
      </Styled.Text>

      <Styled.Text $fontSize={14} $lineHeight={1.3}>
        {stepModalContent.description}
      </Styled.Text>

      {stepModalContent.imageSrc !== undefined && <Styled.Image src={stepModalContent.imageSrc} alt='' />}

      <Styled.ButtonsWrapper>
        {currentStep > 1 && (
          <Styled.ModalButton onClick={backProps.onClick}>
            Назад
          </Styled.ModalButton>
        )}
        {(stepsCount > 1 && currentStep < stepsCount) && (
          <Styled.ModalButton onClick={primaryProps.onClick}>
            Дальше
          </Styled.ModalButton>
        )}
        {currentStep === stepsCount && (
          <Styled.ModalButton onClick={closeProps.onClick}>
            Понятно
          </Styled.ModalButton>
        )}
      </Styled.ButtonsWrapper>

      <Styled.CloseButton onClick={skipProps.onClick}>
        &#10006;
      </Styled.CloseButton>
    </Styled.StepsModal>
  )
}

export default StepModal
