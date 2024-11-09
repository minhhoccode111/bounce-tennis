-- Create the Users table
CREATE TABLE Users (
    id NVARCHAR(50) PRIMARY KEY, -- Assuming `id` is unique and serves as the primary key
    name NVARCHAR(255) NOT NULL,
    username NVARCHAR(255) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    is_deleted BIT DEFAULT 0, -- Renaming `delete` to `is_deleted` as `delete` is a reserved keyword
    role NVARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')), -- Enum constraint for role
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);
GO

-- Trigger to automatically update `updated_at` on row update
CREATE TRIGGER trg_UpdateTimestamp
ON Users
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Users
    SET updated_at = GETDATE()
    FROM Users INNER JOIN inserted ON Users.id = inserted.id;
END;
GO

-- Insert dummy data
INSERT INTO Users (id, name, username, password, is_deleted, role, created_at, updated_at) VALUES
('1', 'Alice Johnson', 'alicej', 'password123', 0, 'user', GETDATE(), GETDATE()),
('2', 'Bob Smith', 'bobsmith', 'pass456', 0, 'admin', GETDATE(), GETDATE()),
('3', 'Charlie Brown', 'charlieb', 'charlie789', 0, 'user', GETDATE(), GETDATE()),
('4', 'Diana Prince', 'dianap', 'wonderwoman', 0, 'user', GETDATE(), GETDATE()),
('5', 'Evan Davis', 'evand', 'strongpassword', 1, 'user', GETDATE(), GETDATE());
GO
