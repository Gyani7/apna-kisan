
CREATE OR REPLACE FUNCTION get_feed_item_ids(page_number INT, page_size INT)
RETURNS TABLE (
    id uuid,
    type TEXT,
    created_at timestamptz,
    is_featured BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH feed_source AS (
        -- Posts
        SELECT
            p.id,
            'post' AS type,
            p.created_at,
            p.is_featured
        FROM posts AS p

        UNION ALL

        -- Stories (ephemeral, < 24h)
        SELECT
            s.id,
            'story' AS type,
            s.created_at,
            FALSE AS is_featured
        FROM stories AS s
        WHERE s.created_at > (NOW() - INTERVAL '24 hours')

        UNION ALL

        -- Reels
        SELECT
            r.id,
            'reel' AS type,
            r.created_at,
            FALSE AS is_featured
        FROM reels AS r

        UNION ALL
        
        -- Products
        SELECT 
            p.id, 
            'product' as type, 
            p.created_at, 
            FALSE AS is_featured 
        FROM products as p

        UNION ALL

        -- Mandi Rates
        SELECT
            m.id,
            'mandi_rate' AS type,
            m.updated_at AS created_at, -- Treat updated_at as created_at for sorting
            FALSE AS is_featured
        FROM mandi_rates AS m
    )
    SELECT *
    FROM feed_source
    ORDER BY
        is_featured DESC,
        created_at DESC
    LIMIT page_size
    OFFSET (page_number - 1) * page_size;
END;
$$;
