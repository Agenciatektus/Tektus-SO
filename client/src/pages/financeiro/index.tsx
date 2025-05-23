import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Financeiro() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Financeiro</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Botões de Ação Rápida</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse ações financeiras frequentes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Menu Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse balanços, folha de pagamento e cobranças.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Databases</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie contas, entradas, saídas e metas.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Balanço Trimestral</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize balanços por trimestre.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cobranças Próximas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acompanhe cobranças e pagamentos pendentes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gráficos de Rosca</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize gráficos de despesas, entradas e dívidas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 