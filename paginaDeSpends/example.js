import SQLite from "react-native-sqlite-storage";

// Abrir la base de datos
const db = SQLite.openDatabase(
  {
    name: "app.db",
    location: "default",
  },
  () => {
    console.log("Database opened");
  },
  (error) => {
    console.log(error);
  }
);

// Crear tablas
db.transaction((tx) => {
  // Crear tabla User
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      name TEXT,
      password TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    [],
    () => {
      console.log("Table User created successfully");
    },
    (error) => {
      console.log(error);
    }
  );

  // Crear tabla Year
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS Year (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER,
      userId INTEGER,
      FOREIGN KEY (userId) REFERENCES User(id)
    )`,
    [],
    () => {
      console.log("Table Year created successfully");
    },
    (error) => {
      console.log(error);
    }
  );

  // Crear tabla Month
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS Month (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      yearId INTEGER,
      month TEXT,
      brutIncome REAL,
      FOREIGN KEY (yearId) REFERENCES Year(id)
    )`,
    [],
    () => {
      console.log("Table Month created successfully");
    },
    (error) => {
      console.log(error);
    }
  );

  // Crear tabla Spend
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
    )`,
    [],
    () => {
      console.log("Table Spend created successfully");
    },
    (error) => {
      console.log(error);
    }
  );
});

// Función para insertar un usuario
const insertUser = (email, name, password) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO User (email, name, password) VALUES (?, ?, ?)",
      [email, name, password],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log("User inserted successfully");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });
};

// Función para insertar un año
const insertYear = (year, userId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Year (year, userId) VALUES (?, ?)",
      [year, userId],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log("Year inserted successfully");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });
};

// Función para insertar un mes
const insertMonth = (yearId, month, brutIncome) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Month (yearId, month, brutIncome) VALUES (?, ?, ?)",
      [yearId, month, brutIncome],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log("Month inserted successfully");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });
};

// Función para insertar un gasto
const insertSpend = (monthId, service, amount, type, description) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Spend (monthId, service, amount, type, description) VALUES (?, ?, ?, ?, ?)",
      [monthId, service, amount, type, description],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log("Spend inserted successfully");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });
};
