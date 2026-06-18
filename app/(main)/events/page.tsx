
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function EventsPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Events</PageHeaderHeading>
        <PageHeaderDescription>
          Find out about the latest events.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
