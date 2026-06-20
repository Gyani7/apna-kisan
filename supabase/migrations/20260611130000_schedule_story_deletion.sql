-- Enable the pg_cron extension if it's not already enabled.
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant usage of the cron schema to the postgres user.
-- This is necessary to allow the postgres user to schedule and manage cron jobs.
GRANT USAGE ON SCHEMA cron TO postgres;

-- Create a function to delete stories older than 24 hours.
-- This function is now idempotent, it can be created or replaced without error.
CREATE OR REPLACE FUNCTION delete_old_stories()
RETURNS void AS $$
BEGIN
  DELETE FROM stories WHERE created_at < now() - interval '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Schedule the delete_old_stories function to run daily.
-- This block first tries to unschedule an existing job with the same name to avoid errors on re-runs.
DO $$
BEGIN
  -- Attempt to unschedule the job. If it doesn't exist, an exception will be raised and caught.
  BEGIN
    PERFORM cron.unschedule('delete-old-stories-daily');
  EXCEPTION
    WHEN OTHERS THEN
      -- The job did not exist, which is fine. Do nothing.
      NULL;
  END;

  -- Schedule the job to run every day at midnight.
  PERFORM cron.schedule(
    'delete-old-stories-daily',
    '0 0 * * *', -- Every day at midnight
    'SELECT delete_old_stories()'
  );
END;
$$;
