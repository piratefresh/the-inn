import { QuoteIcon } from '@radix-ui/react-icons';
import ButtonsStyles from './Buttons.module.css';
import { ITipTapButtonProps } from './ListStyleButtons';

export const ToggleQuote = ({
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
      <QuoteIcon />
    </button>
  );
};
