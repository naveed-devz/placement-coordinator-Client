import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="student-shell min-h-screen">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-6 sm:py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <section className="space-y-7">
          <BrandLogo />
          <div className="max-w-xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-normal text-secondary">Student Placement Portal</p>
            <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              Daily placement prep, all in one focused workspace.
            </h1>
            <p className="text-base leading-7 text-muted-foreground">
              Track tasks, homework, assessments, scores, feedback, announcements, and preparation progress with
              student data.
            </p>
          </div>
          <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
            {["3 pending tasks", "82% average score", "2 assessments"].map((item) => (
              <div key={item} className="rounded-lg border bg-white/80 p-4 text-sm font-medium shadow-soft">
                {item}
              </div>
            ))}
          </div>
        </section>

        <Card className="mx-auto w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter any username/email and password to view the student dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                onLogin();
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="identity">
                  Username or email
                </label>
                <Input id="identity" placeholder="student@example.edu" autoComplete="username" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Any password"
                    className="pr-11"
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input className="h-4 w-4 rounded border-input accent-primary" type="checkbox" />
                  Remember me
                </label>
                <button className="font-medium text-primary" type="button">
                  Forgot password?
                </button>
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
              <p className="text-center text-sm text-muted-foreground">Need help? Contact placement support.</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
