Pasos para configurar y utilizar SQLite en React Native:
Instalar dependencias necesarias:

Usa la biblioteca react-native-sqlite-storage para manejar la base de datos SQLite.
bash
Copy code
npm install react-native-sqlite-storage
Configurar react-native-sqlite-storage:

Si estás usando React Native CLI, vincula la biblioteca:
bash
Copy code
npx react-native link react-native-sqlite-storage
Si estás usando CocoaPods en iOS, asegúrate de ejecutar:
bash
Copy code
cd ios
pod install
cd ..
Inicializar y configurar la base de datos:

Crear y configurar la base de datos:

Aquí tienes un ejemplo de cómo crear y manejar las tablas según el esquema proporcionado:

javascript
Copy code
import SQLite from 'react-native-sqlite-storage';

// Abrir la base de datos
const db = SQLite.openDatabase(
{
name: 'app.db',
location: 'default',
},
() => { console.log('Database opened'); },
error => { console.log(error); }
);

// Crear tablas
db.transaction(tx => {
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
() => { console.log('Table User created successfully'); },
error => { console.log(error); }
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
() => { console.log('Table Year created successfully'); },
error => { console.log(error); }
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
() => { console.log('Table Month created successfully'); },
error => { console.log(error); }
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
() => { console.log('Table Spend created successfully'); },
error => { console.log(error); }
);
});

// Función para insertar un usuario
const insertUser = (email, name, password) => {
db.transaction(tx => {
tx.executeSql(
'INSERT INTO User (email, name, password) VALUES (?, ?, ?)',
[email, name, password],
(tx, results) => {
if (results.rowsAffected > 0) {
console.log('User inserted successfully');
}
},
error => { console.log(error); }
);
});
};

// Función para insertar un año
const insertYear = (year, userId) => {
db.transaction(tx => {
tx.executeSql(
'INSERT INTO Year (year, userId) VALUES (?, ?)',
[year, userId],
(tx, results) => {
if (results.rowsAffected > 0) {
console.log('Year inserted successfully');
}
},
error => { console.log(error); }
);
});
};

// Función para insertar un mes
const insertMonth = (yearId, month, brutIncome) => {
db.transaction(tx => {
tx.executeSql(
'INSERT INTO Month (yearId, month, brutIncome) VALUES (?, ?, ?)',
[yearId, month, brutIncome],
(tx, results) => {
if (results.rowsAffected > 0) {
console.log('Month inserted successfully');
}
},
error => { console.log(error); }
);
});
};

// Función para insertar un gasto
const insertSpend = (monthId, service, amount, type, description) => {
db.transaction(tx => {
tx.executeSql(
'INSERT INTO Spend (monthId, service, amount, type, description) VALUES (?, ?, ?, ?, ?)',
[monthId, service, amount, type, description],
(tx, results) => {
if (results.rowsAffected > 0) {
console.log('Spend inserted successfully');
}
},
error => { console.log(error); }
);
});
};
Ejemplo de uso en un componente React Native:
javascript
Copy code
import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';

const App = () => {
useEffect(() => {
// Crear las tablas al iniciar la aplicación
db.transaction(tx => {
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
insertUser('john@example.com', 'John Doe', 'password123');
};

const handleInsertYear = () => {
insertYear(2023, 1);
};

const handleInsertMonth = () => {
insertMonth(1, 'January', 5000);
};

const handleInsertSpend = () => {
insertSpend(1, 'Electricity', 100, 'Utility', 'Monthly bill');
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
