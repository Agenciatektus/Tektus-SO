import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function FluxoCaixa() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Fluxo de Caixa</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Entradas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Controle de entradas.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saídas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Controle de saídas.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Saldo atual.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FluxoCaixa;
export { FluxoCaixa }; 