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
      className="text-center mb-2 w-auto min-w-3.5 border-b border-b-base-300 no-spinner"
      type="number"
      value={value}
      autoFocus={false}
      onChange={e => updateRound(parseInt(e.target.value, 10) || 0, index)}
      onBlur={e => updateRound(parseInt(e.target.value, 10) || 0, index)}
    />
  );
};

export default Round;
