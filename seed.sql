-- Create Universities Table
CREATE TABLE universities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  degree_level TEXT NOT NULL,
  tuition_usd INTEGER NOT NULL,
  gpa_required NUMERIC(3, 2) NOT NULL,
  ielts_required NUMERIC(3, 1) NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Applications Table
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL, -- Links to Supabase Auth User ID
  university_id INTEGER REFERENCES universities(id),
  university_name TEXT NOT NULL,
  university_image TEXT,
  degree_level TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  statement TEXT,
  user_gpa NUMERIC(3, 2),
  user_ielts NUMERIC(3, 1),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Policies for Universities (Public Read)
CREATE POLICY "Allow public read access" ON universities FOR SELECT USING (true);

-- Policies for Applications (Users can see their own applications)
CREATE POLICY "Users can view their own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own applications" ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Seed Data for Universities
INSERT INTO universities (name, country, degree_level, tuition_usd, gpa_required, ielts_required, image_url, description) VALUES
(
  'Stanford University', 
  'USA', 
  'Masters', 
  55000, 
  3.8, 
  7.5, 
  'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?auto=format&fit=crop&q=80&w=1000', 
  'A place for learning, discovery, innovation, expression and discourse.'
),
(
  'University of Oxford', 
  'UK', 
  'Bachelors', 
  35000, 
  3.9, 
  7.5, 
  'https://images.unsplash.com/photo-1548504778-9730592f694d?auto=format&fit=crop&q=80&w=1000', 
  'The oldest university in the English-speaking world.'
),
(
  'University of Melbourne', 
  'Australia', 
  'Masters', 
  30000, 
  3.2, 
  6.5, 
  'https://images.unsplash.com/photo-1544006659-f080d3d574c4?auto=format&fit=crop&q=80&w=1000', 
  'Australia''s number one university and world leader in education.'
),
(
  'ETH Zurich', 
  'Switzerland', 
  'Masters', 
  2000, 
  3.5, 
  7.0, 
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=1000', 
  'A public research university in the city of Zürich.'
),
(
  'University of Toronto', 
  'Canada', 
  'Bachelors', 
  45000, 
  3.0, 
  6.5, 
  'https://images.unsplash.com/photo-1629906690272-6a75cb57c0e0?auto=format&fit=crop&q=80&w=1000', 
  'Canada''s top university and a world leader in research.'
),
(
  'Technical University of Munich', 
  'Germany', 
  'Masters', 
  0, 
  3.0, 
  6.5, 
  'https://images.unsplash.com/photo-1590425777926-24a9e8802283?auto=format&fit=crop&q=80&w=1000', 
  'One of Europe''s top universities with a focus on engineering.'
),
(
  'University of Cambridge', 
  'UK', 
  'PhD', 
  40000, 
  3.9, 
  8.0, 
  'https://images.unsplash.com/photo-1558223842-88f54b6ecf43?auto=format&fit=crop&q=80&w=1000', 
  'Dedicated to the pursuit of education, learning and research.'
),
(
  'National University of Singapore', 
  'Singapore', 
  'Bachelors', 
  25000, 
  3.6, 
  7.0, 
  'https://images.unsplash.com/photo-1565511335073-6330953a1d95?auto=format&fit=crop&q=80&w=1000', 
  'A leading global university centred in Asia.'
);
