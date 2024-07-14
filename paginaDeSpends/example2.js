import React, { useEffect } from "react";
import { View, Button, Text } from "react-native";

const App = () => {
  useEffect(() => {
    // Crear las tablas al iniciar la aplicación
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS User (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE,
          name TEXT,
          password TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Year (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          year INTEGER,
          userId INTEGER,
          FOREIGN KEY (userId) REFERENCES User(id)
        )`
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Month (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          yearId INTEGER,
          month TEXT,
          brutIncome REAL,
          FOREIGN KEY (yearId) REFERENCES Year(id)
        )`
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Spend (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          monthId INTEGER,
          service TEXT,
          amount REAL,
          type TEXT,
          description TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (monthId) REFERENCES Month(id),
          INDEX (monthId)
        )`
      );
    });
  }, []);

  const handleInsertUser = () => {
    insertUser("john@example.com", "John Doe", "password123");
  };

  const handleInsertYear = () => {
    insertYear(2023, 1);
  };

  const handleInsertMonth = () => {
    insertMonth(1, "January", 5000);
  };

  const handleInsertSpend = () => {
    insertSpend(1, "Electricity", 100, "Utility", "Monthly bill");
  };

  return (
    <View>
      <Button title="Insert User" onPress={handleInsertUser} />
      <Button title="Insert Year" onPress={handleInsertYear} />
      <Button title="Insert Month" onPress={handleInsertMonth} />
      <Button title="Insert Spend" onPress={handleInsertSpend} />
    </View>
  );
};

export default App;
