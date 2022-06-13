export const TooltipBody = ({ description }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <p>One-Hand</p>
        <p>Sword</p>
      </div>
      <div className="flex flex-row justify-between">
        <p>8 - 13 Damage</p>
        <p>Speed 2.60</p>
      </div>
      <p>(4.0 damage per second)</p>
      <p>+1 Agility</p>
      <p>+2 Stamina</p>
      <p>+2 Fire Resistance</p>
      <p>+2 Fire Resistance</p>
      <p>{description}</p>
      <p>Cost Price: 50 Gold</p>
      <p>Requires Level 60</p>
    </div>
  );
};
