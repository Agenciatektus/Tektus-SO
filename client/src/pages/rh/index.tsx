import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RH() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Recursos Humanos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie informações e dados da equipe.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Banco de Talentos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse e gerencie o banco de talentos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Central de Vagas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie vagas e processos seletivos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trilha Salarial</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize e gerencie a estrutura salarial.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Regras de Conduta</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse as regras e políticas da empresa.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Responsabilidades por Cargo</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize as responsabilidades de cada cargo.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Estratégico</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie o processo de onboarding estratégico.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Burocrático</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie o processo de onboarding burocrático.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>OffBoarding de Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie o processo de offboarding.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 