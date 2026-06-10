-- V3.0: CONTENT RECOMMENDATION ENGINE - SCHEMA SETUP

-- 1. Enable the vector extension
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;

-- 2. Add an 'embedding' column to the community_questions table
ALTER TABLE public.community_questions
ADD COLUMN embedding public.vector(1536);

COMMENT ON COLUMN public.community_questions.embedding IS 'AI-generated vector embedding for similarity search.';

-- 3. Create a function to find matching questions
-- This function will use vector similarity (cosine distance) and filter by state.
CREATE OR REPLACE FUNCTION match_questions(
    query_embedding VECTOR(1536),
    match_threshold FLOAT,
    match_count INT,
    user_state TEXT
)
RETURNS TABLE ( 
    id UUID,
    question TEXT,
    state TEXT,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        cq.id,
        cq.question,
        cq.state,
        1 - (cq.embedding <=> query_embedding) AS similarity
    FROM
        public.community_questions AS cq
    WHERE 
        cq.state = user_state AND 
        1 - (cq.embedding <=> query_embedding) > match_threshold
    ORDER BY
        cq.embedding <=> query_embedding
    LIMIT match_count;
END;
$$
;

-- 4. Create an index for the embedding column
-- Using ivfflat for a good balance of speed and accuracy.
-- The number of lists is chosen as the square root of the number of rows (assuming up to 1M questions).
CREATE INDEX ON public.community_questions
USING ivfflat (embedding public.vector_cosine_ops)
WITH (lists = 1000);
