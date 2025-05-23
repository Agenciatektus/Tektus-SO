import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CriacaoSites() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Criação de Sites</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Projetos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize e gerencie projetos em andamento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Projetos Finalizados</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse o histórico de projetos concluídos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Referências Web</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Explore e gerencie referências para projetos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plugins e Ferramentas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse o banco de dados de plugins e ferramentas.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Criação de Sites</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie o processo de onboarding para sites.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Onboarding E-Commerce</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie o processo de onboarding para e-commerce.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Painel de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize métricas e desempenho da área de criação de sites.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 