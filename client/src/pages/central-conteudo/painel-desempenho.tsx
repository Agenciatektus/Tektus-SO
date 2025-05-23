import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PainelDesempenhoSocial() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Desempenho - Social</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Engajamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de engajamento nas redes sociais.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alcance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Alcance das publicações.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversões</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de conversão de leads.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PainelDesempenhoSocial;
export { PainelDesempenhoSocial }; 