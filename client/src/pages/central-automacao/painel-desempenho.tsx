import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PainelDesempenhoAutomacao() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Desempenho - Automação</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Automações</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de automações.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Integrações</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Status das integrações.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de performance.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PainelDesempenhoAutomacao;
export { PainelDesempenhoAutomacao }; 