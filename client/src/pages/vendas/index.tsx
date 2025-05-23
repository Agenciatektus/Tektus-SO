import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Vendas() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Vendas (Comercial)</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Painel de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize métricas e desempenho do time comercial.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>CRM</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie relacionamentos com clientes e oportunidades.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Agenda Comercial</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie compromissos e reuniões comerciais.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Documentos de Venda</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse scripts de venda e documentos comerciais.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cases de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize e gerencie cases de sucesso.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Metas Comercial</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acompanhe metas e objetivos do time comercial.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Serviços e Planos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie portfólio de serviços e planos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Acompanhamento de Funil</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Monitore o funil de vendas e conversões.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 