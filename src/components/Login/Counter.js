const Counter = ({ active }) => {
  return <div className={`counter ${active ? "active" : ""}`}></div>;
};

export default Counter;
