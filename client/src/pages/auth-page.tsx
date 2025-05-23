import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Grid, Users, TrendingUp, BarChart3, Eye, EyeOff } from "lucide-react";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.enum(["admin", "operations", "sales", "finance", "content", "traffic", "hr"] as const).default("operations"),
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
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      console.log('Iniciando validação do formulário de registro...');
      const validatedData = registerSchema.parse(registerForm);
      setRegisterErrors({});
      
      const { confirmPassword, ...userData } = validatedData;
      console.log('Dados validados com sucesso:', { ...userData, password: '***' });
      
      console.log('Iniciando requisição de registro...');
      await registerMutation.mutateAsync(userData);
      console.log('Usuário registrado com sucesso!');
    } catch (error) {
      console.error('Erro durante o registro:', error);
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
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
            <h2 className="text-3xl font-space font-bold text-foreground">Bem-vindo</h2>
            <p className="text-muted-foreground mt-2">
              Entre ou crie sua conta para acessar o centro de operações
            </p>
          </div>

          {/* Auth Forms */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Criar Conta</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Entrar</CardTitle>
                  <CardDescription>
                    Digite suas credenciais para acessar o dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">Usuário</Label>
                      <Input
                        id="login-username"
                        type="text"
                        placeholder="Digite seu usuário"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        className={loginErrors.username ? "border-destructive" : ""}
                      />
                      {loginErrors.username && (
                        <p className="text-sm text-destructive">{loginErrors.username}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Senha</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite sua senha"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          className={loginErrors.password ? "border-destructive" : ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
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
                          Entrando...
                        </>
                      ) : (
                        "Entrar"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Criar Conta</CardTitle>
                  <CardDescription>
                    Preencha os dados para criar sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-firstName">Nome</Label>
                        <Input
                          id="register-firstName"
                          type="text"
                          placeholder="João"
                          value={registerForm.firstName}
                          onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                          className={registerErrors.firstName ? "border-destructive" : ""}
                        />
                        {registerErrors.firstName && (
                          <p className="text-sm text-destructive">{registerErrors.firstName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-lastName">Sobrenome</Label>
                        <Input
                          id="register-lastName"
                          type="text"
                          placeholder="Silva"
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
                        placeholder="joao@exemplo.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className={registerErrors.email ? "border-destructive" : ""}
                      />
                      {registerErrors.email && (
                        <p className="text-sm text-destructive">{registerErrors.email}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Usuário</Label>
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="joaosilva"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                        className={registerErrors.username ? "border-destructive" : ""}
                      />
                      {registerErrors.username && (
                        <p className="text-sm text-destructive">{registerErrors.username}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-role">Função</Label>
                      <Select
                        value={registerForm.role}
                        onValueChange={(value) => setRegisterForm({ ...registerForm, role: value as any })}
                      >
                        <SelectTrigger className={registerErrors.role ? "border-destructive" : ""}>
                          <SelectValue placeholder="Selecione sua função" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="operations">Operações</SelectItem>
                          <SelectItem value="sales">Vendas</SelectItem>
                          <SelectItem value="finance">Financeiro</SelectItem>
                          <SelectItem value="content">Conteúdo</SelectItem>
                          <SelectItem value="traffic">Tráfego</SelectItem>
                          <SelectItem value="hr">RH</SelectItem>
                        </SelectContent>
                      </Select>
                      {registerErrors.role && (
                        <p className="text-sm text-destructive">{registerErrors.role}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Crie uma senha forte"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                          className={registerErrors.password ? "border-destructive" : ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {registerErrors.password && (
                        <p className="text-sm text-destructive">{registerErrors.password}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-confirmPassword">Confirmar Senha</Label>
                      <div className="relative">
                        <Input
                          id="register-confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirme sua senha"
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                          className={registerErrors.confirmPassword ? "border-destructive" : ""}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
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
                          Criando conta...
                        </>
                      ) : (
                        "Criar Conta"
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
              Centralize Suas
              <span className="text-gradient block">Operações de Marketing</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Gerencie CRM, tarefas, finanças e automação em uma única plataforma poderosa para agências de marketing.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
              <Users className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-space font-semibold text-foreground">CRM</h3>
              <p className="text-sm text-muted-foreground">Gerencie clientes e relacionamentos</p>
            </div>
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-space font-semibold text-foreground">Analytics</h3>
              <p className="text-sm text-muted-foreground">Acompanhe performance e ROI</p>
            </div>
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
              <BarChart3 className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-space font-semibold text-foreground">Financeiro</h3>
              <p className="text-sm text-muted-foreground">Controle de faturas e pagamentos</p>
            </div>
            <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border/50">
              <Grid className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-space font-semibold text-foreground">Automação</h3>
              <p className="text-sm text-muted-foreground">Otimize seus fluxos de trabalho</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
