import Joyride, { ACTIONS } from 'react-joyride'

import './styled.tsx'
import * as Styled from './styled.tsx'
import { JOYRIDE_GENERAL_PROPS, JOYRIDE_STEP_GENERAL_PROPS, STEPS } from 'data/index.tsx'
import { useState } from 'react'
import type { CallBackProps } from 'react-joyride'
import { getStepItemId } from './utils.tsx'

export default function Onboarding() {
  const [steps, setSteps] = useState(STEPS)
  const [isJoyrideRunning, setIsJoyrideRunning] = useState(false)

  const removeBlockHandler = () => {
    setSteps((steps) => steps.slice(0, steps.length - 1))
  }

  const addBlockHandler = () => {
    setSteps((steps) => [...steps, {
      ...JOYRIDE_STEP_GENERAL_PROPS,
      target: `#block-${steps.length + 1}`,
    }])
  }

  const showOnboarding = () => {
    setIsJoyrideRunning(true)
  }

  const joyrideCallbackHandler = (data: CallBackProps) => {
    if (data.action === ACTIONS.RESET) {
      setIsJoyrideRunning(false)
    }
  }

  return (
    <Styled.Root>
      <Styled.Actions>
        <Styled.Button onClick={addBlockHandler}>Добавить блок</Styled.Button>
        <Styled.Button disabled={steps.length === 0} onClick={removeBlockHandler}>Удалить последний блок</Styled.Button>
        <Styled.Button disabled={steps.length === 0} onClick={showOnboarding}>Показать онбоардинг</Styled.Button>
      </Styled.Actions>

      {steps.length > 0 && (
        <>
          <Styled.BlocksWrapper>
            {steps.map(({ target }, index) => (
              <Styled.Content key={index} id={getStepItemId(target, index)}>{`Блок ${index + 1}`}</Styled.Content>
            ))}
          </Styled.BlocksWrapper>

          <Joyride {...JOYRIDE_GENERAL_PROPS} steps={steps} run={isJoyrideRunning} callback={joyrideCallbackHandler} />
        </>
      )}
    </Styled.Root>
  )
}
