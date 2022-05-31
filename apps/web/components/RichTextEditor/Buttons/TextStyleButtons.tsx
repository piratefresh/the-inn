import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';
import ButtonsStyles from './Buttons.module.css';
import { ITipTapButtonProps } from './ListStyleButtons';

export const BoldButton = ({
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
      <FontBoldIcon />
    </button>
  );
};
export const ItalicButton = ({
  onClick,
  isActive,
  className,
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
      <FontItalicIcon />
    </button>
  );
};
export const StrikeButton = ({
  onClick,
  isActive,
  className,
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
      <StrikethroughIcon />
    </button>
  );
};
export const UnderlineButton = ({
  onClick,
  isActive,
  className,
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
      <UnderlineIcon />
    </button>
  );
};
