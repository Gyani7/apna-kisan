
CREATE OR REPLACE FUNCTION get_random_farming_tip()
RETURNS TABLE (
  id BIGINT,
  title TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    id,
    title,
    content,
    created_at,
    is_active
  FROM
    public.farming_tips
  WHERE
    is_active = TRUE
  ORDER BY
    random()
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;
