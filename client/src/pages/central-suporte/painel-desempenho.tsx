import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PainelDesempenhoSuporte() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Desempenho - Suporte</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de tickets.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SLA</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de SLA.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Satisfação</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de satisfação.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PainelDesempenhoSuporte;
export { PainelDesempenhoSuporte }; 