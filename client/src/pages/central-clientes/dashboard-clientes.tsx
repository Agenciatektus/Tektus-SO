import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DashboardClientes() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Clientes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Resumo geral dos clientes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Últimas atividades dos clientes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Alertas importantes sobre clientes.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardClientes;
export { DashboardClientes }; 