import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketingAgencia() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Marketing Agência</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Painel de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize métricas e desempenho do marketing da agência.</p>
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
            <CardTitle>Métricas Tintim</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acompanhe métricas e relatórios do Tintim.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Caixa de Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie emails e comunicações da agência.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Email Marketing</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie campanhas de email marketing.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 