import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PainelDesempenhoTrafego() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Desempenho - Tráfego</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Visitas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de visitas ao site.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversões</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Taxa de conversão de visitantes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Retorno sobre investimento em tráfego.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PainelDesempenhoTrafego;
export { PainelDesempenhoTrafego }; 