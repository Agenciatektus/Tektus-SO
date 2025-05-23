import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ControleFaturamento() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Controle de Faturamento</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Faturas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de faturas e cobranças.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Histórico de faturamento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Relatórios financeiros.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 