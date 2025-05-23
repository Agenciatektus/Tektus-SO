import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TarefasConteudo() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tarefas de Conteúdo</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tarefas de conteúdo pendentes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tarefas de conteúdo em andamento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Concluídas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tarefas de conteúdo concluídas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TarefasConteudo;
export { TarefasConteudo }; 