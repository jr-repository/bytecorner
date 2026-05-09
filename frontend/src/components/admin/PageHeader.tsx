import type { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function PageHeader({ title, description, action, icon }: Props) {
  return (
    <div className="page-header-card flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4 relative z-10">
        {icon && (
          <div className="size-12 rounded-2xl bg-white/70 grid place-items-center text-teal-deep shadow-sm">
            {icon}
          </div>
        )}
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold leading-tight">{title}</h1>
          {description && <p className="text-sm text-ink/75 mt-1 max-w-xl">{description}</p>}
        </div>
      </div>
      {action && <div className="relative z-10">{action}</div>}
    </div>
  );
}
