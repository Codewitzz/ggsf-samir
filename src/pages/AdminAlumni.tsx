import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { adminSignIn, adminSignOut, isAdminSessionActive } from "@/lib/notices/adminNoticesStore";
import {
  addAlumniRegistration,
  addAlumniStory,
  deleteAlumniRegistration,
  deleteAlumniStory,
  getAlumniRegistrations,
  getAlumniStories,
} from "@/lib/alumni/adminAlumniStore";
import { toast } from "@/hooks/use-toast";
import { ExternalLink, LogOut, Trash2, Users } from "lucide-react";

const AdminAlumni = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAdminSessionActive());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [department, setDepartment] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");

  const [storyName, setStoryName] = useState("");
  const [storyBatch, setStoryBatch] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [storyText, setStoryText] = useState("");

  useEffect(() => {
    const clearCredentials = () => {
      setUsername("");
      setPassword("");
      setLoginError(null);
    };
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) clearCredentials();
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    const onChanged = () => setTick((x) => x + 1);
    window.addEventListener("ggsf_admin_alumni_changed", onChanged);
    return () => window.removeEventListener("ggsf_admin_alumni_changed", onChanged);
  }, []);

  const registrations = useMemo(() => getAlumniRegistrations(), [tick]);
  const stories = useMemo(() => getAlumniStories(), [tick]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = await adminSignIn(username.trim(), password);
    if (result.ok) {
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      toast({ title: "Logged in", description: "You can now manage alumni entries." });
    } else {
      setLoginError(result.reason);
    }
  };

  const handleLogout = () => {
    adminSignOut();
    setIsLoggedIn(false);
    toast({ title: "Signed out" });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto max-w-lg px-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Sign in to manage alumni registrations and stories.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleLogin} autoComplete="off">
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" autoComplete="off" />
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="new-password" />
                {loginError && <div className="text-sm text-destructive">{loginError}</div>}
                <Button type="submit" className="w-full">Log in</Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-10 space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-7 w-7 text-primary" />
              Admin: Alumni
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Manage alumni registrations and stories from one panel.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/alumni">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Alumni Page
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Alumni Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" />
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
              <div className="grid grid-cols-2 gap-3">
                <Input value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} placeholder="Graduation year" />
                <Input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
                <Input value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" />
              </div>
              <Button
                onClick={() => {
                  if (!fullName.trim() || !email.trim()) {
                    toast({ title: "Name and email are required", variant: "destructive" });
                    return;
                  }
                  addAlumniRegistration({
                    fullName: fullName.trim(),
                    email: email.trim(),
                    phone: phone.trim() || undefined,
                    graduationYear: graduationYear.trim() || undefined,
                    department: department.trim() || undefined,
                    company: company.trim() || undefined,
                    designation: designation.trim() || undefined,
                  });
                  setFullName("");
                  setEmail("");
                  setPhone("");
                  setGraduationYear("");
                  setDepartment("");
                  setCompany("");
                  setDesignation("");
                  toast({ title: "Registration added" });
                }}
              >
                Save registration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Alumni Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input value={storyName} onChange={(e) => setStoryName(e.target.value)} placeholder="Alumni name" />
              <div className="grid grid-cols-2 gap-3">
                <Input value={storyBatch} onChange={(e) => setStoryBatch(e.target.value)} placeholder="Batch/year" />
                <Input value={storyTitle} onChange={(e) => setStoryTitle(e.target.value)} placeholder="Role/title" />
              </div>
              <Textarea value={storyText} onChange={(e) => setStoryText(e.target.value)} placeholder="Story text" />
              <Button
                onClick={() => {
                  if (!storyName.trim() || !storyText.trim()) {
                    toast({ title: "Name and story are required", variant: "destructive" });
                    return;
                  }
                  addAlumniStory({
                    name: storyName.trim(),
                    batch: storyBatch.trim() || undefined,
                    title: storyTitle.trim() || undefined,
                    story: storyText.trim(),
                  });
                  setStoryName("");
                  setStoryBatch("");
                  setStoryTitle("");
                  setStoryText("");
                  toast({ title: "Story added" });
                }}
              >
                Save story
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Registrations ({registrations.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[420px] overflow-y-auto">
              {registrations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No registrations yet.</p>
              ) : (
                registrations.map((item) => (
                  <div key={item.id} className="rounded-md border p-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.fullName}</p>
                      <p className="text-sm text-muted-foreground">{item.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.department ?? "—"} {item.graduationYear ? `• ${item.graduationYear}` : ""}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteAlumniRegistration(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stories ({stories.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[420px] overflow-y-auto">
              {stories.length === 0 ? (
                <p className="text-sm text-muted-foreground">No stories yet.</p>
              ) : (
                stories.map((item) => (
                  <div key={item.id} className="rounded-md border p-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.title ?? "Alumni"} {item.batch ? `• Batch ${item.batch}` : ""}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{item.story}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteAlumniStory(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminAlumni;
