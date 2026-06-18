
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";

export default function WeatherPage() {
  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Weather</PageHeaderHeading>
        <PageHeaderDescription>
          Get the latest weather updates.
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
