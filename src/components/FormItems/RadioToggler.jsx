const RadioToggler = ({ options, defaultValue, onChange }) => {
  return (
    <div className="radio-togglers shadow">
      {options.map((item) => (
        <label key={item.value}>
          <input
            type="radio"
            name="bgType"
            onClick={(ev) => onChange(ev.target.value)}
            value={item.value}
            defaultChecked={defaultValue === item.value}
          />
          <div>
            <item.icon /> <span>{item.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default RadioToggler;
