import { animatedGradient } from './animatedGradient'
import css from '@emotion/css'

export const animatedGradientBox = ({
  duration,
  colors,
  degrees,
  gradientSize,
  borderWidth = '2px',
  interactive = false,
  blur = '9px',
  spread = '0px',
} = {}) => css`
  --computed-gradient-blur: ${blur};

  z-index: 1;
  border-radius: 5px;
  position: relative;

  &::before,
  &::after {
    ${animatedGradient({
      colors,
      gradientSize,
      degrees,
      duration,
    })}

    content: '';
    position: absolute;
    border-radius: inherit;
    z-index: -1;

    transition: all 0.5s ease;
  }

  &::before {
    top: -${borderWidth};
    left: -${borderWidth};
    width: calc(100% + (${borderWidth} * 2));
    height: calc(100% + (${borderWidth} * 2));
  }

  &::after {
    filter: blur(var(--computed-gradient-blur));
    top: calc(-${borderWidth} - ${spread});
    left: calc(-${borderWidth} - ${spread});
    width: calc(100% + (${borderWidth} * 2) + (${spread} * 2));
    height: calc(100% + (${borderWidth} * 2) + (${spread} * 2));
  }

  ${interactive &&
    css`
      &::before,
      &::after {
        opacity: 0.6;
      }

      &:hover {
        --computed-gradient-blur: calc(${blur} * 1.2);
        &::before,
        &::after {
          opacity: 1;
        }
      }

      &:active {
        --computed-gradient-blur: calc(${blur} * 0.6);
        &::before,
        &::after {
          opacity: 1;
        }
      }
    `}
`
