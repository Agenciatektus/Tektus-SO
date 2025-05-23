import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Tarefas() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tarefas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Lista de tarefas pendentes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tarefas em progresso.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Concluídas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Histórico de tarefas concluídas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
