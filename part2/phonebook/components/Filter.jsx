const Filter = ({ query, onQueryChange }) => {
  return (
    <div>
      filter shown with
      <input value={query} onChange={onQueryChange} />
    </div>
  );
};

export default Filter;
