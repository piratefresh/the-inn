import { List } from 'react-feather';
import ButtonsStyles from './Buttons.module.css';

export interface ITipTapButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const ToggleBulletList = ({
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
    <button onClick={onClick} className={classes.join(' ')}>
      <List />
    </button>
  );
};
export const DefaultToolbarButton = ({
  onClick,
  isActive,
  icon,
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
      {icon}
    </button>
  );
};
