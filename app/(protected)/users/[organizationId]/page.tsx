import {
  HeaderContent,
  MainContent,
  ReuseableBreadcrumbs,
} from "@/components/dashboard/users/layout";

const UsersDashboardPage = ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const { organizationId } = params;

  const links = [{ label: "Dashboard", href: `users/${organizationId}` }];

  return (
    <>
      <HeaderContent>
        <ReuseableBreadcrumbs links={links} page="Home" />
      </HeaderContent>

      <MainContent>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <h1>Users Dashboard</h1>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </MainContent>
    </>
  );
};

export default UsersDashboardPage;
