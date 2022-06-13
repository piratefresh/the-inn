export const TooltipHeader = ({
  title,
  itemLvl,
  binds,
  type,
  quality,
  description,
}) => {
  switch (type) {
    case "npc":
      return (
        <div>
          <p className="text-brandYellow">{title}</p>
          <p>{description}</p>
        </div>
      );
    case "item":
      return (
        <div>
          <p>{title}</p>
          <p className="text-brandYellow">Item Level {itemLvl}</p>
          <p>{binds}</p>
        </div>
      );
    default:
      return null;
  }
};
