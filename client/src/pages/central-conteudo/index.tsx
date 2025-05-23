import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CentralConteudo() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Central de Conteúdo</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Painel de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize métricas e desempenho das redes sociais.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Documentos de Social Media</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse e gerencie documentos relacionados às redes sociais.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pipeline de Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie o fluxo de produção de conteúdo.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendário de Publicação</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Planeje e visualize o calendário de publicações.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie tarefas específicas do setor de conteúdo.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 