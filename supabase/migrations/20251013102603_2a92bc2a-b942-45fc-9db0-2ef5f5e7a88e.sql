-- Add first_access field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN first_access boolean DEFAULT true;

-- Update existing users to have first_access as false (they've already accessed)
UPDATE public.profiles 
SET first_access = false;