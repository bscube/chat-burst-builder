
-- Create table for AI conversation prompts
CREATE TABLE public.ai_prompts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  system_prompt TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for knowledge base documents
CREATE TABLE public.knowledge_base (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  file_type TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for AI conversation settings
CREATE TABLE public.ai_conversation_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  prompt_id UUID REFERENCES public.ai_prompts,
  model_name TEXT DEFAULT 'gpt-3.5-turbo',
  temperature DECIMAL DEFAULT 0.7,
  max_tokens INTEGER DEFAULT 1000,
  use_knowledge_base BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.ai_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversation_settings ENABLE ROW LEVEL SECURITY;

-- AI Prompts policies
CREATE POLICY "Users can view their own ai_prompts" 
  ON public.ai_prompts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ai_prompts" 
  ON public.ai_prompts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ai_prompts" 
  ON public.ai_prompts 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ai_prompts" 
  ON public.ai_prompts 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Knowledge Base policies
CREATE POLICY "Users can view their own knowledge_base" 
  ON public.knowledge_base 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own knowledge_base" 
  ON public.knowledge_base 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own knowledge_base" 
  ON public.knowledge_base 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own knowledge_base" 
  ON public.knowledge_base 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- AI Conversation Settings policies
CREATE POLICY "Users can view their own ai_conversation_settings" 
  ON public.ai_conversation_settings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ai_conversation_settings" 
  ON public.ai_conversation_settings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ai_conversation_settings" 
  ON public.ai_conversation_settings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ai_conversation_settings" 
  ON public.ai_conversation_settings 
  FOR DELETE 
  USING (auth.uid() = user_id);
