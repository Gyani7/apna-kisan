-- Seed tasks
INSERT INTO tasks (user_id, name, status)
SELECT id, 'Prepare soil for wheat sowing', 'Pending' FROM profiles LIMIT 1;
INSERT INTO tasks (user_id, name, status)
SELECT id, 'Buy fertilizers and seeds', 'Completed' FROM profiles LIMIT 1;

-- Seed finances
INSERT INTO finances (user_id, transaction_type, amount, description)
SELECT id, 'income', 150000, 'Sale of produce' FROM profiles LIMIT 1;
INSERT INTO finances (user_id, transaction_type, amount, description)
SELECT id, 'expense', 75000, 'Purchase of seeds and fertilizers' FROM profiles LIMIT 1;

-- Seed inventory
INSERT INTO inventory (user_id, name, quantity, unit)
SELECT id, 'Urea', 50, 'kg' FROM profiles LIMIT 1;
INSERT INTO inventory (user_id, name, quantity, unit)
SELECT id, 'DAP', 25, 'kg' FROM profiles LIMIT 1;

-- Seed advisories
INSERT INTO advisories (title, content, crop_type, region)
VALUES
  ('Wheat Sowing Advisory', 'The ideal time for sowing wheat is from the first fortnight of November to the first fortnight of December. Use certified seeds for best results. Seed treatment with fungicide is recommended to protect against seed-borne diseases.', 'Wheat', 'North India'),
  ('Pest Control for Rice', 'Monitor your paddy fields for pests like stem borer and leaf folder. Use pheromone traps to monitor pest populations. If pest populations exceed economic threshold levels, use recommended pesticides. Always follow the instructions on the pesticide label.', 'Rice', 'South India');

-- Seed schemes
INSERT INTO schemes (name, description, eligibility, benefits, link)
VALUES
  ('PM-Kisan Samman Nidhi', 'An income support scheme for all landholding farmer families.', 'All landholding farmer families.', '₹6,000 per year in three equal installments.', 'https://pmkisan.gov.in/'),
  ('Pradhan Mantri Fasal Bima Yojana', 'A crop insurance scheme to provide financial support to farmers suffering crop loss/damage arising out of unforeseen events.', 'All farmers including sharecroppers and tenant farmers growing notified crops in the notified areas are eligible for coverage.', 'Insurance cover against failure of the crop, thus stabilising the income of farmers.', 'https://pmfby.gov.in/');

-- Seed loans
INSERT INTO loans (bank_name, loan_type, interest_rate, max_amount, processing_fee)
VALUES
  ('State Bank of India', 'Kisan Credit Card', 7.0, 300000, 0.5),
  ('HDFC Bank', 'Tractor Loan', 8.5, 1000000, 1.0);

-- Seed weather_data
INSERT INTO weather_data (location, data)
VALUES ('user_location', '{"current":{"temperature":32,"humidity":75,"wind_speed":10,"precipitation":0},"hourly":[{"time":"Now","temperature":32,"condition":"Sunny"},{"time":"1 PM","temperature":33,"condition":"Sunny"}],"daily":[{"date":"Today","max_temp":34,"min_temp":25,"condition":"Partly Cloudy"}]}');

-- Seed mandi_rates
INSERT INTO mandi_rates (commodity, variety, price)
VALUES
    ('Wheat', 'Lokwan', 2500),
    ('Soybean', 'JS-335', 5500),
    ('Cotton', 'American', 7000);
