-- Crea la tabella profiles per informazioni utente
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  instagram_username TEXT,
  profession TEXT,
  niche TEXT,
  goal TEXT,
  tone TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Abilita RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: gli utenti possono vedere solo il proprio profilo
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: gli utenti possono inserire il proprio profilo
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: gli utenti possono aggiornare il proprio profilo
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Funzione per aggiornare updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger per updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Funzione per creare profilo automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger per creare profilo quando l'utente si registra
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Crea tabella per le idee di contenuto
CREATE TABLE public.content_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  hook TEXT NOT NULL,
  caption TEXT NOT NULL,
  cta TEXT NOT NULL,
  hashtags TEXT[] NOT NULL,
  scheduled_date TIMESTAMPTZ,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.content_ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ideas"
  ON public.content_ideas
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ideas"
  ON public.content_ideas
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ideas"
  ON public.content_ideas
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ideas"
  ON public.content_ideas
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE TRIGGER set_content_ideas_updated_at
  BEFORE UPDATE ON public.content_ideas
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();