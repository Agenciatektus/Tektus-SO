import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Grid, Users, TrendingUp, BarChart3 } from "lucide-react";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "operations",
  });
  const [loginErrors, setLoginErrors] = useState<Partial<LoginForm>>({});
  const [registerErrors, setRegisterErrors] = useState<Partial<RegisterForm>>({});

  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = loginSchema.parse(loginForm);
      setLoginErrors({});
      await loginMutation.mutateAsync(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<LoginForm> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof LoginForm] = err.message;
          }
        });
        setLoginErrors(errors);
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = registerSchema.parse(registerForm);
      setRegisterErrors({});
      
      const { confirmPassword, ...userData } = validatedData;
      await registerMutation.mutateAsync(userData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<RegisterForm> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof RegisterForm] = err.message;
          }
        });
        setRegisterErrors(errors);
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Authentication Forms */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Grid className="w-6 h-6 text-background" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-space font-bold text-foreground">Tektus</h1>
                <p className="text-sm text-muted-foreground">Marketing OS</p>
              </div>
            </div>
            <h2 className="text-3xl font-space font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to your marketing operations center
            </p>
          </div>

          {/* Auth Forms */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">Username</Label>
                      <Input
                        id="login-username"
                        type="text"
                        placeholder="Enter your username"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        className={loginErrors.username ? "border-destructive" : ""}
                      />
                      {loginErrors.username && (
                        <p className="text-sm text-destructive">{loginErrors.username}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className={loginErrors.password ? "border-destructive" : ""}
                      />
                      {loginErrors.password && (
                        <p className="text-sm text-destructive">{loginErrors.password}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Get started with your marketing operations center
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-firstName">First Name</Label>
                        <Input
                          id="register-firstName"
                          type="text"
                          placeholder="John"
                          value={registerForm.firstName}
                          onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                          className={registerErrors.firstName ? "border-destructive" : ""}
                        />
                        {registerErrors.firstName && (
                          <p className="text-sm text-destructive">{registerErrors.firstName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-lastName">Last Name</Label>
                        <Input
                          id="register-lastName"
                          type="text"
                          placeholder="Doe"
                          value={registerForm.lastName}
                          onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                          className={registerErrors.lastName ? "border-destructive" : ""}
                        />
                        {registerErrors.lastName && (
                          <p className="text-sm text-destructive">{registerErrors.lastName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="john@example.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className={registerErrors.email ? "border-destructive" : ""}
                      />
                      {registerErrors.email && (
                        <p className="text-sm text-destructive">{registerErrors.email}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="johndoe"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                        className={registerErrors.username ? "border-destructive" : ""}
                      />
                      {registerErrors.username && (
                        <p className="text-sm text-destructive">{registerErrors.username}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-role">Role</Label>
                      <Select
                        value={registerForm.role}
                        onValueChange={(value) => setRegisterForm({ ...registerForm, role: value as any })}
                      >
                        <SelectTrigger className={registerErrors.role ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                      {registerErrors.role && (
                        <p className="text-sm text-destructive">{registerErrors.role}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Create a strong password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className={registerErrors.password ? "border-destructive" : ""}
                      />
                      {registerErrors.password && (
                        <p className="text-sm text-destructive">{registerErrors.password}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-confirmPassword">Confirm Password</Label>
                      <Input
                        id="register-confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        className={registerErrors.confirmPassword ? "border-destructive" : ""}
                      />
                      {registerErrors.confirmPassword && (
                        <p className="text-sm text-destructive">{registerErrors.confirmPassword}</p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right side - Hero Section */}
      <div className="hidden lg:flex bg-gradient-to-br from-primary/20 via-green-400/20 to-teal-500/20 items-center justify-center p-8">
        <div className="max-w-md text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-space font-bold text-foreground">
              Streamline Your
              <span className="text-gradient block">Marketing Operations</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Centralize your CRM, tasks, finance, and automation in one powerful platform designed for marketing agencies.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
              <Users className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-space font-semibold text-foreground">CRM</h3>
              <p className="text-sm text-muted-foreground">Manage clients & relationships</p>
            </div>
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-space font-semibold text-foreground">Analytics</h3>
              <p className="text-sm text-muted-foreground">Track performance & ROI</p>
            </div>
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
              <BarChart3 className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-space font-semibold text-foreground">Finance</h3>
              <p className="text-sm text-muted-foreground">Invoice & payment tracking</p>
            </div>
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
              <Grid className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-space font-semibold text-foreground">Automation</h3>
              <p className="text-sm text-muted-foreground">Streamline workflows</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
