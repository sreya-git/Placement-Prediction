-- ==============================================================================
-- DATA SCIENCE LAB - SUPABASE DATABASE SCHEMA
-- Table: students
-- Designed for 1st-Year B.Tech Data Science Curriculum
-- ==============================================================================

-- 1. Create the students table
CREATE TABLE IF NOT EXISTS public.students (
    id BIGSERIAL PRIMARY KEY,
    dept VARCHAR(10),
    year VARCHAR(10),
    attendance_percentage NUMERIC(5, 2),
    study_hour NUMERIC(4, 2),
    mid_term_score NUMERIC(5, 2),
    final_score NUMERIC(5, 2),
    projects_completed NUMERIC(4, 1),
    backlogs INTEGER,
    placement_status VARCHAR(30),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add documentation comments on columns
COMMENT ON TABLE public.students IS 'Raw student demographic, academic, and placement records for Data Science Lab.';
COMMENT ON COLUMN public.students.dept IS 'Department/Branch (e.g. CSE, IT, ECE, EEE, ME, CE)';
COMMENT ON COLUMN public.students.year IS 'Year of study (e.g. 1st, 2nd, 3rd, 4th)';
COMMENT ON COLUMN public.students.attendance_percentage IS 'Class attendance percentage (0 to 100)';
COMMENT ON COLUMN public.students.study_hour IS 'Average daily study hours';
COMMENT ON COLUMN public.students.mid_term_score IS 'Mid-term examination score (out of 100)';
COMMENT ON COLUMN public.students.final_score IS 'Final examination score (out of 100)';
COMMENT ON COLUMN public.students.projects_completed IS 'Number of capstone/course projects completed';
COMMENT ON COLUMN public.students.backlogs IS 'Number of active backlogs/arrears';
COMMENT ON COLUMN public.students.placement_status IS 'Target label: Placed, Not Placed, or Not Eligible';

-- 3. Enable Row Level Security (RLS) to protect dataset integrity
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- 4. Create Public Read-Only Policy
-- Allows anyone (including anonymous browser sessions and Next.js backend) to read the original records.
-- Prevents public users/browsers from inserting, updating, or deleting original records.
DROP POLICY IF EXISTS "Allow Public Read Access" ON public.students;
CREATE POLICY "Allow Public Read Access"
    ON public.students
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- 5. Helpful index for queries
CREATE INDEX IF NOT EXISTS idx_students_dept ON public.students(dept);
CREATE INDEX IF NOT EXISTS idx_students_placement ON public.students(placement_status);
