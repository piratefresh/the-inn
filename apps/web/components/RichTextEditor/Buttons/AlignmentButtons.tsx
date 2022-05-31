import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from '@radix-ui/react-icons';
import ButtonsStyles from './Buttons.module.css';
import { ITipTapButtonProps } from './ListStyleButtons';

export const LeftAlignment = ({
  onClick,
  isActive = false,
  className,
  ...props
}: ITipTapButtonProps) => {
  let classes = [ButtonsStyles['toggleButton']];

  if (className) {
    classes.push(className);
  }

  if (isActive) {
    classes.push(ButtonsStyles['isActive']);
  }
  return (
    <button onClick={onClick} className={classes.join(' ')} type="button">
      <TextAlignLeftIcon />
    </button>
  );
};
export const CenterAlignment = ({
  onClick,
  isActive = false,
  className,
  ...props
}: ITipTapButtonProps) => {
  let classes = [ButtonsStyles['toggleButton']];

  if (className) {
    classes.push(className);
  }

  if (isActive) {
    classes.push(ButtonsStyles['isActive']);
  }
  return (
    <button onClick={onClick} className={classes.join(' ')} type="button">
      <TextAlignCenterIcon />
    </button>
  );
};
export const RightAlignment = ({
  onClick,
  isActive = false,
  className,
  ...props
}: ITipTapButtonProps) => {
  let classes = [ButtonsStyles['toggleButton']];

  if (className) {
    classes.push(className);
  }

  if (isActive) {
    classes.push(ButtonsStyles['isActive']);
  }
  return (
    <button onClick={onClick} className={classes.join(' ')} type="button">
      <TextAlignRightIcon />
    </button>
  );
};
