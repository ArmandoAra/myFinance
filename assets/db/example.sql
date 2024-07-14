-- Crear tabla User
CREATE TABLE IF NOT EXISTS User (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  name TEXT,
  password TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Year
CREATE TABLE IF NOT EXISTS Year (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  year INTEGER,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES User(id)
);

-- Crear tabla Month
CREATE TABLE IF NOT EXISTS Month (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  yearId INTEGER,
  month TEXT,
  brutIncome REAL,
  FOREIGN KEY (yearId) REFERENCES Year(id)
);

-- Crear tabla Spend
CREATE TABLE IF NOT EXISTS Spend (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  monthId INTEGER,
  service TEXT,
  amount REAL,
  type TEXT,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (monthId) REFERENCES Month(id)
);

-- Insertar datos de prueba en la tabla User
INSERT INTO User (email, name, password) VALUES ('john.doe@example.com', 'John Doe', 'password123');
INSERT INTO User (email, name, password) VALUES ('jane.smith@example.com', 'Jane Smith', 'password456');
INSERT INTO User (email, name, password) VALUES ('bob.jones@example.com', 'Bob Jones', 'password789');
INSERT INTO User (email, name, password) VALUES ('guest@example.com', 'Guest User', 'guestpassword');


INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Internet', 50, 'expense', 'Monthly internet bill');
INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Gym', 40, 'expense', 'Monthly gym membership');
INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Transportation', 100, 'expense', 'Monthly transportation costs');
INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Dining Out', 200, 'expense', 'Monthly dining out expenses');
INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Subscription', 15, 'expense', 'Monthly subscription service');
INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Entertainment', 75, 'expense', 'Monthly entertainment expenses');