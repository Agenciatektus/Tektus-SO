import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CentralClientes() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Central de Clientes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Agenda de Reuniões</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie e visualize todas as reuniões com clientes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Controle de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie informações e status dos clientes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize métricas e áreas de cada cliente.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NPS Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acompanhe o Net Promoter Score dos clientes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie o processo de onboarding de novos clientes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gestão de Crise</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie e acompanhe situações de crise com clientes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>OffBoarding e Churn</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie o processo de offboarding e análise de churn.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 