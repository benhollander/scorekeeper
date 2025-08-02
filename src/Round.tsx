const Round = ({
  value,
  index,
  updateRound,
}: {
  value: number;
  index: number;
  updateRound: (e: number, i: number) => void;
}) => {
  return (
    <input
      className="text-center mb-2 pl-4"
      type="number"
      value={value}
      autoFocus={false}
      onChange={e => updateRound(parseInt(e.target.value, 10), index)}
      onBlur={e => updateRound(parseInt(e.target.value, 10), index)}
    />
  );
};

export default Round;
