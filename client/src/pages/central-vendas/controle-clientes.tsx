import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ControleClientes() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Controle de Clientes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de clientes ativos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Histórico de interações com clientes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Métricas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de relacionamento com clientes.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 