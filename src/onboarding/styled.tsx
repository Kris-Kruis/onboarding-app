import React, { ReactNode } from 'react'
import styled from 'styled-components'
import type { TextProps, ButtonProps } from './types'

/** Onboarding styles */
export const Root: React.ComponentType<{ children: ReactNode[] }> = styled.div`
  height: 100%;
  padding: 15px;
  overflow: scroll;
`

export const Actions: React.ComponentType<{ children: ReactNode[] }> = styled.div`
  padding: 15px 0;

  & > :not(:first-child) {
    margin-left: 5px;
  }
`

export const Button: React.ComponentType<ButtonProps> = styled.button.attrs({
  type: 'button',
})`
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  background-color: #204e4d;
  color: #fff;
  font-size: 14px;
`

export const BlocksWrapper: React.ComponentType<{ children: ReactNode[] }> = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 40px;
`

export const Content: React.ComponentType<{ children: string, id: string, key: number }> = styled.div`
  width: 180px;
  padding: 30px;
  border-radius: 5px;
  background: #fff;
`

/** Step styles */
export const StepsModal: React.ComponentType<{ children: React.ReactNode[] }> = styled.div`
  position: relative;
  background: #fff;
  width: 400px;
  padding: 20px;
  border-radius: 8px;
`

export const CloseButton: React.ComponentType<ButtonProps> = styled.div`
  position: absolute;
  top: 14px;
  right: 20px;
  color: lightgray;
  font-size: 20px;
  cursor: pointer;
`

export const Text: React.ComponentType<TextProps> = styled.div`
  font-size: ${({ $fontSize }) => `${$fontSize}px`};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  line-height: ${({ $lineHeight }) => $lineHeight};
  color: ${({ $color }) => $color};
  margin-bottom: ${({ $marginBottom }) => `${$marginBottom}px`};
`

export const Image: React.ComponentType<{ src: string, alt: string }> = styled.img`
  position: relative;
  left: 50%;
  width: 200px;
  transform: translate(-50%);
  margin-top: 15px;
`

export const ButtonsWrapper: React.ComponentType<{ children: React.ReactNode[] }> = styled.div`
  margin-top: 10px;

  & > :not(:first-child) {
    margin-left: 5px;
  }
`

export const ModalButton: React.ComponentType<ButtonProps> = styled(Button)`
  background-color: #357e7d;
`
