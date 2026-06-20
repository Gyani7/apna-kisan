-- Create tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  status text DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed')),
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);

-- Create finances table
CREATE TABLE finances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('income', 'expense')),
  amount numeric(10,2) NOT NULL,
  description text,
  transaction_date date DEFAULT now(),
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_finances_user_id ON finances(user_id);

-- Create inventory table
CREATE TABLE inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  quantity numeric(10,2) NOT NULL,
  unit text,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_inventory_user_id ON inventory(user_id);


-- Create advisories table
CREATE TABLE advisories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  crop_type text,
  region text,
  created_at timestamptz DEFAULT now()
);

-- Create schemes table
CREATE TABLE schemes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  eligibility text,
  benefits text,
  link text
);

-- Create loans table
CREATE TABLE loans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_name text NOT NULL,
  loan_type text NOT NULL,
  interest_rate numeric(5,2),
  max_amount integer,
  processing_fee numeric(4,2)
);

-- Create weather_data table
CREATE TABLE weather_data (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    location text NOT NULL,
    data jsonb NOT NULL,
    updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_weather_data_location ON weather_data(location);
