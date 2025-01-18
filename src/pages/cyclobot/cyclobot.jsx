import { useState } from "react";

const Cyclobot = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the input value, e.g., send it to an API or process it
    console.log("User input:", inputValue);
  };

  return (
    <div style={styles.container}>
      <h1>Suggested topics:</h1>
      <ul style={styles.topicsList}>
        <li>blank</li>
        <li>blank</li>
        <li>blank</li>
        <li>blank</li>
        <li>blank</li>
      </ul>

      <div style={styles.cyclobotSection}>
        <h2>Cyclobot</h2>
        <p>Having doubts? Cyclobot is here to help.</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a prompt here"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  topicsList: {
    listStyleType: "none",
    padding: "0",
  },
  cyclobotSection: {
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Cyclobot;