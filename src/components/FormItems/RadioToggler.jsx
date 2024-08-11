const RadioToggler = ({ options }) => {
  return (
    <div className="radio-togglers shadow">
      {options.map((item) => (
        <label key={item.value}>
          <input type="radio" name="bgType" value={item.value} />
          <div>
            <item.icon /> <span>{item.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default RadioToggler;
