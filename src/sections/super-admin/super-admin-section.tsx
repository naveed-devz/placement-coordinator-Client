import { useState } from "react";
import { BarChart3, Check, CreditCard, LifeBuoy, Plus, Settings, ShieldCheck, X } from "lucide-react";
import { DonutProgress } from "@/components/common/donut-progress";
import { SectionIntro } from "@/components/common/section-intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auditLogs, organizationRequests, organizations, platformMetrics, platformUsers, supportTickets } from "@/data/super-admin";
import type { OrganizationRequest, OrganizationRow, SuperAdminNavLabel } from "@/types/super-admin";

export function SuperAdminSection({ activeNav, onAction }: { activeNav: SuperAdminNavLabel; onAction: (message: string) => void }) {
  const [orgRows, setOrgRows] = useState<OrganizationRow[]>(organizations);
  const [requests, setRequests] = useState<OrganizationRequest[]>(organizationRequests);
  const [selectedOrgId, setSelectedOrgId] = useState(orgRows[0]?.id ?? "");
  const selectedOrg = orgRows.find((org) => org.id === selectedOrgId) ?? orgRows[0];

  function updateOrgStatus(orgId: string, status: string) {
    setOrgRows((items) => items.map((org) => (org.id === orgId ? { ...org, status } : org)));
    onAction(`Organization ${status.toLowerCase()}.`);
  }

  function handleRequest(requestId: string, status: string) {
    setRequests((items) => items.map((request) => (request.id === requestId ? { ...request, status } : request)));
    onAction(`Organization request ${status.toLowerCase()}.`);
  }

  if (activeNav === "Organizations") {
    return <OrganizationsPage organizations={orgRows} selectedOrg={selectedOrg} onSelectOrg={setSelectedOrgId} onUpdateStatus={updateOrgStatus} />;
  }
  if (activeNav === "Requests") return <RequestsPage requests={requests} onHandleRequest={handleRequest} />;
  if (activeNav === "Users") return <UsersPage />;
  if (activeNav === "Plans") return <PlansPage onAction={onAction} />;
  if (activeNav === "Analytics") return <AnalyticsPage organizations={orgRows} />;
  if (activeNav === "Support") return <SupportPage onAction={onAction} />;
  if (activeNav === "Audit Logs") return <AuditPage />;
  if (activeNav === "Settings") return <PlatformSettingsPage onAction={onAction} />;

  return <SuperAdminDashboard organizations={orgRows} requests={requests} onAction={onAction} />;
}

function SuperAdminDashboard({
  organizations,
  requests,
  onAction,
}: {
  organizations: OrganizationRow[];
  requests: OrganizationRequest[];
  onAction: (message: string) => void;
}) {
  return (
    <>
      <SectionIntro
        eyebrow="Super Admin"
        title="Platform operations across every organization."
        description="Approve institutions, manage subscriptions, monitor platform usage, review support, and audit activity."
        action={
          <Button onClick={() => onAction("Global platform action opened.")}>
            <Plus className="h-4 w-4" />
            Global Action
          </Button>
        }
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {platformMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Organization Health</CardTitle>
            <CardDescription>{organizations.length} organizations tracked.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {organizations.map((org) => (
              <div key={org.id} className="grid gap-3 rounded-lg border p-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{org.name}</p>
                    <Badge variant={org.status === "Active" ? "secondary" : org.status === "Suspended" ? "danger" : "warning"}>{org.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {org.plan} · {org.students} students · {org.region}
                  </p>
                </div>
                <DonutProgress value={org.usage} size="sm" className="justify-self-start sm:justify-self-end" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Work</CardTitle>
            <CardDescription>Platform queues.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Organization requests", value: requests.filter((request) => request.status !== "Approved").length, icon: ShieldCheck },
              { label: "Support tickets", value: supportTickets.length, icon: LifeBuoy },
              { label: "Plans active", value: "4", icon: CreditCard },
              { label: "Audit events", value: auditLogs.length, icon: BarChart3 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-xl font-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function OrganizationsPage({
  organizations,
  selectedOrg,
  onSelectOrg,
  onUpdateStatus,
}: {
  organizations: OrganizationRow[];
  selectedOrg: OrganizationRow;
  onSelectOrg: (orgId: string) => void;
  onUpdateStatus: (orgId: string, status: string) => void;
}) {
  return (
    <>
      <SectionIntro
        eyebrow="Organizations"
        title="Create, activate, suspend, and inspect tenant organizations."
        description="Each organization has isolated users, students, coordinators, sections, subscriptions, and usage."
      />
      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_410px]">
        <Card>
          <CardHeader>
            <CardTitle>Organization Directory</CardTitle>
            <CardDescription>Tenant status and subscription overview.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {organizations.map((org) => (
              <button
                key={org.id}
                className={`grid w-full gap-3 rounded-lg border p-3 text-left md:grid-cols-[minmax(0,1fr)_110px_120px] md:items-center ${
                  selectedOrg.id === org.id ? "border-primary bg-primary/5" : "bg-white"
                }`}
                onClick={() => onSelectOrg(org.id)}
              >
                <div>
                  <p className="font-semibold">{org.name}</p>
                  <p className="text-sm text-muted-foreground">{org.students} students · {org.coordinators} coordinators · {org.region}</p>
                </div>
                <Badge variant="outline">{org.plan}</Badge>
                <Badge variant={org.status === "Active" ? "secondary" : org.status === "Suspended" ? "danger" : "warning"}>{org.status}</Badge>
              </button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{selectedOrg.name}</CardTitle>
            <CardDescription>Tenant controls and usage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InfoTile label="Plan" value={selectedOrg.plan} />
              <InfoTile label="Status" value={selectedOrg.status} />
              <InfoTile label="Students" value={String(selectedOrg.students)} />
              <InfoTile label="Coordinators" value={String(selectedOrg.coordinators)} />
            </div>
            <DonutProgress value={selectedOrg.usage} label="Usage" caption="Current tenant resource usage" />
            <div className="grid gap-2 sm:grid-cols-2">
              <Button variant="outline" onClick={() => onUpdateStatus(selectedOrg.id, "Active")}>Activate</Button>
              <Button variant="outline" onClick={() => onUpdateStatus(selectedOrg.id, "Suspended")}>Suspend</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function RequestsPage({ requests, onHandleRequest }: { requests: OrganizationRequest[]; onHandleRequest: (requestId: string, status: string) => void }) {
  return (
    <>
      <SectionIntro
        eyebrow="Organization Requests"
        title="Review and approve new institution onboarding requests."
        description="Approve valid institutions, reject incomplete requests, or mark them for review."
      />
      <Card>
        <CardContent className="space-y-3 p-4 sm:p-5">
          {requests.map((request) => (
            <div key={request.id} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[minmax(0,1fr)_130px_220px] md:items-center">
              <div>
                <p className="font-semibold">{request.name}</p>
                <p className="text-sm text-muted-foreground">{request.contact} · {request.submitted}</p>
              </div>
              <Badge variant="outline">{request.status}</Badge>
              <div className="grid gap-2 sm:grid-cols-2">
                <Button variant="outline" size="sm" onClick={() => onHandleRequest(request.id, "Approved")}>
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
                <Button variant="outline" size="sm" onClick={() => onHandleRequest(request.id, "Rejected")}>
                  <X className="h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

function UsersPage() {
  return (
    <>
      <SectionIntro
        eyebrow="Users"
        title="Platform-wide users across organizations."
        description="Monitor organization admins, coordinators, and account status across tenants."
      />
      <Card>
        <CardContent className="space-y-3 p-4 sm:p-5">
          {platformUsers.map((user) => (
            <div key={user.id} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[minmax(0,1fr)_180px_110px] md:items-center">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email} · {user.organization}</p>
              </div>
              <Badge variant="outline">{user.role}</Badge>
              <Badge variant={user.status === "Active" ? "secondary" : "warning"}>{user.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

function PlansPage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <SectionIntro
        eyebrow="Plans"
        title="Subscription plans and tenant billing controls."
        description="Manage plan limits, subscriptions, and upgrade/downgrade actions."
        action={<Button onClick={() => onAction("Plan creation opened.")}><Plus className="h-4 w-4" />New Plan</Button>}
      />
      <section className="grid gap-4 md:grid-cols-3">
        {["Starter", "Growth", "Enterprise"].map((plan, index) => (
          <Card key={plan}>
            <CardHeader>
              <CardTitle>{plan}</CardTitle>
              <CardDescription>{index === 0 ? "Small colleges" : index === 1 ? "Growing institutions" : "Large organizations"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-3xl font-bold">{index === 0 ? "₹9k" : index === 1 ? "₹29k" : "Custom"}</p>
              <Badge variant="outline">{index === 2 ? "Unlimited users" : `${index === 0 ? 500 : 2500} students`}</Badge>
              <Button className="w-full" variant="outline">Edit Plan</Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}

function AnalyticsPage({ organizations }: { organizations: OrganizationRow[] }) {
  return (
    <>
      <SectionIntro
        eyebrow="Platform Analytics"
        title="Growth, usage, subscriptions, and tenant activity."
        description="Compare organizations, plan usage, active users, and placement-preparation engagement."
      />
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Organization Usage</CardTitle>
            <CardDescription>Usage by tenant.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {organizations.map((org) => (
              <div key={org.id} className="rounded-lg border p-3">
                <DonutProgress value={org.usage} label={org.name} caption={`${org.students} students`} size="sm" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Tenant plans.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Enterprise 36%", "Growth 42%", "Starter 14%", "Trial 8%"].map((item) => (
              <div key={item} className="rounded-lg border p-3 text-sm font-semibold">{item}</div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function SupportPage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <SectionIntro
        eyebrow="Support"
        title="Support requests from organizations."
        description="Track, escalate, and resolve institution support requests."
      />
      <Card>
        <CardContent className="space-y-3 p-4 sm:p-5">
          {supportTickets.map((ticket) => (
            <div key={ticket.id} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[minmax(0,1fr)_100px_120px] md:items-center">
              <div>
                <p className="font-semibold">{ticket.id} · {ticket.title}</p>
                <p className="text-sm text-muted-foreground">{ticket.organization}</p>
              </div>
              <Badge variant={ticket.priority === "Critical" ? "danger" : ticket.priority === "High" ? "warning" : "outline"}>{ticket.priority}</Badge>
              <Button size="sm" variant="outline" onClick={() => onAction(`${ticket.id} opened.`)}>Open</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

function AuditPage() {
  return (
    <>
      <SectionIntro
        eyebrow="Audit Logs"
        title="Platform activity and compliance trail."
        description="Review actions across organizations, subscriptions, settings, and user access."
      />
      <Card>
        <CardContent className="space-y-3 p-4 sm:p-5">
          {auditLogs.map((log, index) => (
            <div key={log} className="rounded-lg border p-3 text-sm">
              <span className="font-semibold">#{index + 1}</span> · {log}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

function PlatformSettingsPage({ onAction }: { onAction: (message: string) => void }) {
  return (
    <>
      <SectionIntro
        eyebrow="Global Settings"
        title="Platform defaults, security, and system controls."
        description="Configure global permissions, security controls, support routing, and platform behavior."
        action={<Button onClick={() => onAction("Platform settings saved.")}><Settings className="h-4 w-4" />Save Settings</Button>}
      />
      <Card>
        <CardContent className="grid gap-3 p-4 sm:p-5 md:grid-cols-2">
          <Input defaultValue="support@placeprep.io" />
          <Input defaultValue="Default Growth Plan" />
          <Input defaultValue="MFA optional" />
          <Input defaultValue="Audit retention 365 days" />
        </CardContent>
      </Card>
    </>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
