import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Fluxos() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Fluxos de Automação</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Fluxos de automação em execução.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Em Desenvolvimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Fluxos em fase de desenvolvimento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Histórico de execução dos fluxos.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 