import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PainelDesempenhoVendas() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Desempenho - Vendas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Faturamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de faturamento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversões</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Taxa de conversão de vendas.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Metas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acompanhamento de metas de vendas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PainelDesempenhoVendas;
export { PainelDesempenhoVendas }; 