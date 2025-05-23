import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CentralTrafego() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Central do Tráfego</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Painel de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize métricas e desempenho das campanhas de tráfego.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gestão de Anúncios Meta</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie campanhas e anúncios no Meta Ads.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gestão de Anúncios Google</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie campanhas e anúncios no Google Ads.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie tarefas específicas do setor de tráfego.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Métricas Tintim</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acompanhe métricas e relatórios do Tintim.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 