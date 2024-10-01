const Notification = ({ message, isError }) => {
  const notificationStyle = {
    color: isError ? "red" : "green",
    backgroundColor: "lightgray",
    borderStyle: "solid",
    borderRadius: 5,
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) return null;
  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  );
};
export default Notification;
