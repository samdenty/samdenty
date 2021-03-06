import * as React from 'react'
import styled2 from '@emotion/styled'
import { styled } from 'linaria/react'
import { animatedGradientBox } from '../../utils'
import Moment from 'react-moment'
import { css } from '@emotion/core'
import { Play } from './Play'
import { Previous, Next } from './Arrow'
import { Pause } from './Pause'

export const CircleMargin = '25px'

const StyledProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 800px) {
    margin-left: calc(-9px + ${CircleMargin});
  }
`

const Progress = styled.div`
  display: flex;
  align-items: center;
`

const Track = styled.div`
  display: flex;
  height: 15px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 9px;
`

const Handle = styled2.div`
  will-change: width;
  transition: width 1s linear;
  width: ${({ value }) => value}%;
  border-radius: inherit;

  ${({ theme }) =>
    animatedGradientBox({
      duration: 100 * 1000,
      blur: '5px',
      borderWidth: '1px',
      colors: theme.colorfulGradient,
    })}
  border-radius: inherit;
  background-size: ${500 * 7}px;
`

const Timestamp = styled2(Moment)`
  font-family: Gilroy;
  font-weight: bold;
  font-size: 0.9rem;
  width: 50px;
  flex-shrink: 0;
  opacity: 0.5;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  svg {
    margin: 0 3px;
    opacity: 0.6;
    height: 35px;
  }
`

export const ProgressBar = ({ playing, progress, duration }) => {
  const percent = (progress / duration) * 100

  return (
    <StyledProgressBar>
      <Buttons>
        <Previous />
        {playing ? <Pause /> : <Play />}
        <Next />
      </Buttons>

      <Progress>
        <Timestamp
          format="mm:ss"
          css={css`
            text-align: left;
          `}
        >
          {progress}
        </Timestamp>
        <Track>{percent ? <Handle value={percent} /> : null}</Track>
        <Timestamp
          format="mm:ss"
          css={css`
            text-align: right;
          `}
        >
          {duration}
        </Timestamp>
      </Progress>
    </StyledProgressBar>
  )
}
