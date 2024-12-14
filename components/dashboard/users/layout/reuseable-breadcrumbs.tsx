import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type ReuseableBreadcrumbsProps = {
  links: { label: string; href: string }[];
  page: string;
};

export const ReuseableBreadcrumbs = ({
  links,
  page,
}: ReuseableBreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map(({ href, label }) => (
          <Fragment key={href}>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </Fragment>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage>{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
