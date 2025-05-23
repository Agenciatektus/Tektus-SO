import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PainelDesempenhoRelatorios() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Desempenho - Relatórios</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Métricas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas gerais.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>KPIs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Indicadores de desempenho.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Análises</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Análises e insights.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PainelDesempenhoRelatorios;
export { PainelDesempenhoRelatorios }; 