import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, ShieldCheck, UserPlus } from "lucide-react";
import { createAdminAccount, getAdminSessionInfo, isAdminSessionActive } from "@/lib/notices/adminNoticesStore";

const AdminCreateAccount = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn] = useState(isAdminSessionActive());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const session = getAdminSessionInfo();
    if (!session?.username) {
      setError("Only logged-in staff/admin users can create accounts.");
      return;
    }

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const result = await createAdminAccount(username.trim(), password, session.username);
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.reason);
      return;
    }

    toast({
      title: "Account created",
      description: "Your admin account is ready. Please sign in from the admin login page.",
    });
    navigate("/admin/notices");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a1f]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1a1144]/90 via-[#52166b]/60 to-[#113063]/90" />
      <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-12 h-80 w-80 rounded-full bg-cyan-500/25 blur-3xl" />

      <div className="relative z-10">
        <Header />
        <main className="px-4 py-10 md:py-16">
          <div className="container mx-auto max-w-3xl">
            <Card className="border-violet-200/30 bg-slate-950/70 text-slate-100 shadow-2xl shadow-indigo-950/45 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-300/30 bg-violet-400/20">
                    <UserPlus className="h-6 w-6 text-violet-100" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      Create New Account
                      <ShieldCheck className="h-5 w-5 text-cyan-300" />
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Register a new admin account to manage Notices & Announcements.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!isLoggedIn ? (
                  <div className="space-y-4 rounded-2xl border border-rose-300/30 bg-rose-500/10 p-5 text-slate-100">
                    <p className="text-sm">
                      Account creation is restricted. Please sign in as staff/admin first from the admin login page.
                    </p>
                    <Button
                      asChild
                      type="button"
                      className="h-11 border-violet-300/40 bg-violet-500/10 text-violet-100 shadow-md shadow-violet-950/20 transition-all hover:-translate-y-0.5 hover:border-fuchsia-300/60 hover:bg-fuchsia-500/15 hover:text-white"
                    >
                      <Link to="/admin/notices">
                        <ArrowLeft className="h-4 w-4" />
                        Go to Admin Login
                      </Link>
                    </Button>
                  </div>
                ) : (
                <form className="space-y-4 rounded-2xl border border-violet-200/15 bg-slate-900/65 p-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Username</label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a username"
                      className="h-11 border-violet-300/20 bg-slate-950/85 text-slate-100 placeholder:text-slate-400 focus-visible:ring-fuchsia-400/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Password</label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a secure password"
                      className="h-11 border-violet-300/20 bg-slate-950/85 text-slate-100 placeholder:text-slate-400 focus-visible:ring-fuchsia-400/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Confirm Password</label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="h-11 border-violet-300/20 bg-slate-950/85 text-slate-100 placeholder:text-slate-400 focus-visible:ring-fuchsia-400/70"
                    />
                  </div>

                  {error && <div className="rounded-xl border border-rose-400/35 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</div>}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 border-0 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 text-white shadow-lg shadow-fuchsia-950/30 transition-all hover:-translate-y-0.5 hover:from-fuchsia-400 hover:via-violet-400 hover:to-indigo-400"
                    >
                      {isSubmitting ? "Creating..." : "Create Account"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button
                      asChild
                      type="button"
                      className="h-11 border-violet-300/40 bg-violet-500/10 text-violet-100 shadow-md shadow-violet-950/20 transition-all hover:-translate-y-0.5 hover:border-fuchsia-300/60 hover:bg-fuchsia-500/15 hover:text-white"
                    >
                      <Link to="/admin/notices">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Login
                      </Link>
                    </Button>
                  </div>
                </form>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminCreateAccount;
