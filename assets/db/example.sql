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

-- Crear tabla Month ????NO SE USA
CREATE TABLE IF NOT EXISTS Month (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  yearId INTEGER,
  month TEXT,
  brutIncome REAL,
  FOREIGN KEY (userId) REFERENCES User(id),
  FOREIGN KEY (yearId) REFERENCES Year(id)
);


-- Crear tabla Spend
CREATE TABLE IF NOT EXISTS Spend (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  month TEXT,
  year INTEGER,
  service TEXT,
  amount REAL,
  type TEXT,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id)
);

-- Crear tabla Income
CREATE TABLE IF NOT EXISTS Income (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  month TEXT,
  userId INTEGER,
  year INTEGER,
  amount REAL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id)
);

-- Insertar datos de prueba en la tabla User
INSERT INTO User (email, name, password) VALUES ('john.doe@example.com', 'John Doe', 'password123');

INSERT INTO Year (year, userId) VALUES (2024, @userId);
INSERT INTO Year (year, userId) VALUES (2025, @userId);
INSERT INTO Year (year, userId) VALUES (2026, @userId);
INSERT INTO Year (year, userId) VALUES (2027, @userId);
INSERT INTO Year (year, userId) VALUES (2028, @userId);
INSERT INTO Year (year, userId) VALUES (2029, @userId);

INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'January', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'February', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'March', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'April', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'May', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'June', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'July', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'August', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'September', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'October', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'November', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (0, 'December', 0);

INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'January', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'February', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'March', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'April', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'May', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'June', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'July', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'August', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'September', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'October', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'November', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (1, 'December', 0);

INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'January', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'February', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'March', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'April', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'May', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'June', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'July', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'August', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'September', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'October', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'November', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (2, 'December', 0);

INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'January', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'February', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'March', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'April', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'May', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'June', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'July', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'August', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'September', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'October', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'November', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (3, 'December', 0);

INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'January', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'February', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'March', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'April', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'May', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'June', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'July', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'August', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'September', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'October', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'November', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (4, 'December', 0);

INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'January', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'February', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'March', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'April', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'May', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'June', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'July', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'August', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'September', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'October', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'November', 0);
INSERT INTO Month (yearId, month, brutIncome) VALUES (5, 'December', 0);


INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Internet', 50, 'expense', 'Monthly internet bill');
INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Gym', 40, 'expense', 'Monthly gym membership');
INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Transportation', 100, 'expense', 'Monthly transportation costs');
INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Dining Out', 200, 'expense', 'Monthly dining out expenses');
INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Subscription', 15, 'expense', 'Monthly subscription service');
INSERT INTO Spend (monthId, service, amount, type, description) VALUES (7, 'Entertainment', 75, 'expense', 'Monthly entertainment expenses');