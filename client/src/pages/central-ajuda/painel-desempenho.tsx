import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PainelDesempenhoAjuda() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Desempenho - Ajuda</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Artigos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de artigos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tutoriais</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de tutoriais.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de FAQ.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PainelDesempenhoAjuda;
export { PainelDesempenhoAjuda }; 