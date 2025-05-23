import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ControleDespesas() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Controle de Despesas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de despesas e pagamentos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Histórico de despesas.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Relatórios de despesas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 