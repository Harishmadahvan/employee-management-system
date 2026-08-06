-- Seed departments
INSERT INTO departments (name, description, created_at) VALUES
('Information Technology', 'Software development and infrastructure', CURRENT_TIMESTAMP),
('Human Resources', 'Recruitment, payroll and employee relations', CURRENT_TIMESTAMP),
('Finance', 'Accounting, budgeting and financial planning', CURRENT_TIMESTAMP),
('Marketing', 'Brand, campaigns and market research', CURRENT_TIMESTAMP);

-- Seed employees
INSERT INTO employees (first_name, last_name, email, phone, salary, hire_date, department_id, created_at, updated_at) VALUES
('Aarav', 'Sharma', 'aarav.sharma@company.com', '9876543210', 75000.00, '2022-03-15', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Priya', 'Patel', 'priya.patel@company.com', '9876543211', 68000.00, '2021-07-01', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Rohan', 'Mehta', 'rohan.mehta@company.com', '9876543212', 55000.00, '2023-01-10', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sneha', 'Reddy', 'sneha.reddy@company.com', '9876543213', 82000.00, '2020-11-20', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Vikram', 'Singh', 'vikram.singh@company.com', '9876543214', 60000.00, '2022-09-05', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ananya', 'Iyer', 'ananya.iyer@company.com', '9876543215', 71000.00, '2021-04-18', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
