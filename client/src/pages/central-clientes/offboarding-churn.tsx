import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function OffboardingChurn() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Offboarding e Churn</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Processo de Offboarding</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Detalhes do processo de saída de clientes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Análise de Churn</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Análise de clientes perdidos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Retenção</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de retenção de clientes.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OffboardingChurn;
export { OffboardingChurn }; 